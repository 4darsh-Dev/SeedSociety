import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Defs, ClipPath, Image, Circle } from 'react-native-svg';

const ImageFrame = ({ size, image }) => {
 
  return (
    // <View style={{ width: size, height: size }}>
    //   <Svg width={300} height={300}>
    //     <Defs>
    //       <ClipPath id="blob">
    //         <Path d={blobPath} />
    //       </ClipPath>
    //     </Defs>
        
    //     {/* Background shape */}
    //     <Path
    //       d={blobPath}
    //       fill="#DC2626"
    //     />
    //     {/* Add your image here using a native component */}
    //     {/* <Image
    //       x="0"
    //       y="0"
    //       width={size}
    //       height={size}
    //       href={image}
    //       clipPath="url(#blobClip)"
    //       preserveAspectRatio="xMidYMid slice"
    //     /> */}
    //   </Svg>
    // </View>
    <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 160 140">
      <Defs>
        <ClipPath id="clipPath">
        <Path d="M81.6662 136.5C97.6165 136.5 113.619 126.078 125.606 111.686C137.598 97.2866 145.666 78.8022 145.666 62.5C145.666 46.1417 137.543 35.1129 125.47 28.2003C113.425 21.3041 97.4527 18.5 81.6662 18.5C65.9067 18.5 49.1341 20.6581 37.3042 29.1479C31.3764 33.402 26.6973 39.2405 24.014 47.1662C21.333 55.0849 20.6532 65.0593 22.6726 77.5796C26.4303 100.877 33.2132 115.635 43.0884 124.558C52.9727 133.49 65.8694 136.5 81.6662 136.5Z" fill="#fffd" stroke="#EEEEEE"/>
        </ClipPath>
      </Defs>
      <Image
        href={image}
        width={160}
        height={160}
        preserveAspectRatio="xMidYMid meet"
        clipPath="url(#clipPath)"
      />
      <Path d="M82.2745 145.5C100.758 145.5 119.317 133.495 133.227 116.897C147.142 100.292 156.5 78.9808 156.5 60.1923C156.5 41.3472 147.086 28.6454 133.091 20.6819C119.124 12.7344 100.595 9.5 82.2745 9.5C63.9806 9.5 44.5297 11.9906 30.8168 21.7708C23.9474 26.6701 18.525 33.3938 15.4148 42.5232C12.307 51.6457 11.5173 63.1419 13.8605 77.5801C18.2222 104.455 26.0933 121.463 37.5395 131.742C48.9942 142.029 63.9435 145.5 82.2745 145.5Z" stroke="#EEEEEE" fill='#eeeeee0e'/>
    </Svg>
  </View>
    
  );
};

export default ImageFrame;