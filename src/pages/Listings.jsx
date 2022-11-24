import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking, FaShare } from "react-icons/fa";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useParams } from "react-router-dom";
import SwiperCore, {
  Autoplay, EffectFade, Navigation,
  Pagination
} from "swiper";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import Contact from "../components/Contact";
import Spinner from "../components/Spener";
import { db } from "../Firebase";

export default function Listings() {
  const auth = getAuth();
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopy, setShareLinkCopy] = useState(false);
  const [contactLandlord, setContactLandlord] = useState(false);
  SwiperCore.use([Autoplay, Navigation, Pagination]);
  useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    }
    fetchListing();
  }, [params.listingId]);
  if (loading) {
    return <Spinner />;
  }
console.log(listing);

  // copyLink 
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setShareLinkCopy(true)
    setTimeout(() => {
      setShareLinkCopy(false)

    },2000)
  }
     
 return (
    <main>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        modules={[EffectFade]}
        autoplay={{ delay: 3000 }}
      >
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[300px]"
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div onClick={copyLink} className=" fixed top-[13%] right-[3%] z-30 text-gray-600 bg-transparent cursor-pointer ">
        <FaShare size={25} />

      </div>
      {shareLinkCopy && (
        <p className=" fixed top-[17%] right-[7%] z-40 bg-white px-2 py-2  rounded text-lime-700 font-semibold  ">copy linked</p>
      )}


<div className="m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg bg-white lg:space-x-5">
        <div className=" w-full ">
          <p> {listing.name}-${" "} 
          {listing.offer ? listing.discountedPrice.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") : listing.regularPrice.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  {listing.type === "rent" ? "/ month" : ""}
                  
                   </p>
            <p className="flex items-center mt-6 mb-3 font-semibold">
            <FaMapMarkerAlt className="text-green-700 mr-1" />
            {listing.address}
          </p>

          <div className=" flex justify-start items-center space-x-4 w-[75%]">
            <p className="w-full max-w-[200px] bg-red-800 rounded-md p-1 text-white text-center font-semibold shadow-md">
              {listing.type === "rent" ? "Rent" : "Sale"}
           </p>
           {listing.offer && (
              <p className="w-full max-w-[200px] bg-green-800 rounded-md p-1 text-white text-center font-semibold shadow-md">
                ${+listing.regularPrice - +listing.discountedPrice} discount
              </p>
            )}
          
            
          </div>
          <p className="mt-3 mb-3">
            <span className="font-semibold">Description - </span>
            {listing.description}
          </p>

          <ul className="flex items-center space-x-2 sm:space-x-10 text-sm font-semibold mb-6">
            <li className="flex items-center whitespace-nowrap">
            <FaBed className="text-lg mr-1 text-sky-700" />
              {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
            </li>
            <li className="flex items-center whitespace-nowrap">
            <FaBath className="text-lg mr-1 text-sky-700" />
              {listing.bathrooms > 1 ? `${listing.bedrooms} Bath` : "1 Bed"}
            </li>
            <li className="flex items-center whitespace-nowrap">
            <FaParking className="text-lg mr-1 text-sky-700" />
              {listing.parking  ? "Parking spot" : "No parking"}
            </li>
            <li className="flex items-center whitespace-nowrap">
            <FaChair className="text-lg mr-1 text-sky-700" />
              {listing.furnished  ? "Furnished " : "No furnished"}
            </li>
          </ul>
          {listing.userRef !== auth.currentUser?.uid && !contactLandlord && (
            <div className="mt-6">
              <button
                onClick={() => setContactLandlord(true)}
                className="px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg w-full text-center transition duration-150 ease-in-out "
              >
                Contact Landlord
              </button>
            </div>
          )}
          {contactLandlord && (
            <Contact userRef={listing.userRef} listing={listing} />
          )}
         
   
        </div>


        {/* right side map  */}
        <div className="w-full lg-[400px] ">
        <MapContainer
            center={[listing.geolocation.lat, listing.geolocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[listing.geolocation.lat, listing.geolocation.lng]}
            >
              <Popup>
                {listing.address}
              </Popup>
            </Marker>
          </MapContainer>

        </div>
      </div>
    
    </main>
  );
}