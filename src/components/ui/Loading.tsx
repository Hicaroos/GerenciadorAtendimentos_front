import { ActivityIndicator, View } from 'react-native';

type Props = {
  size  : 'large' | 'small';
  color : string; 
};

const Loading = ({
  size,
  color,
}:Props) => (
  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator 
      size={size} 
      color={color} 
    />
  </View>
);

export default Loading;