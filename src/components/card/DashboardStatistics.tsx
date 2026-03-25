import { JSX } from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  title  : string;
  value  : string; 
  icon   : () => JSX.Element;
};

const DashboardStatistics = ({
  title,
  value,
  icon: Icon,
}:Props) => {
  return (
    <View style={style.dashboard_stats_card}>
      <Text style={style.card_title}>
        {title}
      </Text>

      <View style={style.card_statics_number_and_icon_container}>
        <Text style={style.card_statics_number}>
          {value}
        </Text>

        <Icon/>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  dashboard_stats_card: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#b9b9b9',
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    flex: 1,
  },

  card_title: {
    color: 'gray',
    fontWeight: 500,
  },

  card_statics_number_and_icon_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  card_statics_number: {
    fontSize: 28,
    color: '#5561D7',
    fontWeight: '500',
  },
});

export default DashboardStatistics