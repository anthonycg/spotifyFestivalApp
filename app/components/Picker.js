import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { SafeAreaView } from "react-native";

// selectionsObj = {
//     objects : "Record",
//     parts: "cars"
// }

const PickerOfItems = () => {
    const [artistsOnFlyer, setArtistsOnFlyer] = useState();
    const [selectedArtist, setSelectedArtist] = useState("");

    const handleArtistSelection = () => {

        
    }
    
    return (
        <SafeAreaView>
            <Picker
                selectedValue={"Hello"}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedArtist(itemValue)
                }
            >
                {/* I'll manually enter the artists from the flyer into the db. 
                From there, I'll retrieve the artists from the db with a fetch and set them to state: artistsOnFlyer
                Then I'll map through the artists and set them as the picker.item -- need to address their value though */}
                {/* {artistsOnFlyer.map((idx, artist) => {
                    return(
                        <Picker.Item label={artist.name} value="java" />
                    )
                })} */}
                
                <Picker.Item label="JavaScript" value="js" />
                <Picker.Item label="{artist.name}" value="java" />
            </Picker>
        </SafeAreaView>
    );
};

export default PickerOfItems;
