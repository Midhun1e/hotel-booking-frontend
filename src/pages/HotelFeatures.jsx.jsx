import React from 'react';
import PriceSection from '../components/RoomDetailsPageComponents/PriceSection';
import Amenities from '../components/RoomDetailsPageComponents/Amenities';


const HotelFeatures = () => {
    return ( 
        <React.Fragment>
            <PriceSection />
            <Amenities />
        </React.Fragment>
     );
}
 
export default HotelFeatures;