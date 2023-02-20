import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import theme from '../../theme.config';
import UserService from '../../services/UserService';
import {ScrollView} from 'react-native';
import VisitBox from '../../components/VisitBox';
const {ColorTheme, FontFamily} = theme;

const Visits = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchVisits = async () => {
      await UserService.getVisits()
        .then(res => {
          setData(res.data.content);
        })
        .finally(() => setLoading(false));
    };
    fetchVisits();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.visitsContainer}>
        <Text style={styles.title}>Visits</Text>
        <ScrollView style={styles.scrollView}>
          {!loading
            ? data.map((item, index) => <VisitBox key={index} data={item} />)
            : null}
        </ScrollView>
      </View>
    </View>
  );
};

export default Visits;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  visitsContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: ColorTheme.background,
    alignItems: 'center',
    padding: 20,
  },
  scrollView: {
    width: '100%',
    height: '100%',
  },
  title: {
    color: ColorTheme.secondary,
    fontSize: 20,
    fontFamily: FontFamily.bold,
  },
});
