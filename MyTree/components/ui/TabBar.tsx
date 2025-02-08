import { View, Platform, StyleSheet } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

export default function MyTabBar({ state, descriptors, navigation }:BottomTabBarProps) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={route.name}
            android_ripple={{ borderless: true, color: 'transparent' }}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.button}
            >
                <View style={[styles.activeLine,{display:isFocused ? 'flex':'none', opacity: isFocused ? 1 : 0}]}></View>
            { options.tabBarIcon && options.tabBarIcon({ focused: isFocused, color: isFocused ? '#33b125' : '#737373', size: 24 })}
            
          </PlatformPressable>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
    tabBar:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        position:'absolute',
        bottom:0,
        borderRadius:10
    },
    button:{
        flex:1,
        // display:'flex',
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:10,
    },
    activeLine:{
        position:'absolute',
        bottom:0,
        width:20,
        height:3,
        backgroundColor:'#33b125',
        transitionDuration:'100ms',
        borderRadius:10
    }
})
