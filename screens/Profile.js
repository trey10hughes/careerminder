import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  TouchableOpacity
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import AsyncStorage from '@react-native-community/async-storage'
import { Button,  Input, Icon } from "../components";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fieldList: [
              "Address",
              "Preferred Distance",
              "Email",
              "Phone", 
              "Executive Summary",
              "Cerfitication/Licenses",
              "Career Achievements",
              "Associations",
              "Volunteer Time",
              "Desired Salary",
              "Industry",
              "Experience Level",
              "Title",
              "Highest Degree Obtained",
              "Preferred Job Type",
              "Additional Info"
      ]
    };
  }
  componentDidMount = async () => {
    for (let i = 0; i < this.state.fieldList.length; i++) {
      let name = this.state.fieldList[i]
      let fieldName = name.replace(/[^a-zA-Z0-9]/g, '');
      let STORAGE_KEY = "@" + fieldName
      try {
        const value = await AsyncStorage.getItem(STORAGE_KEY)
        if(value !== null) {
          // value previously stored
          this.setState({ [fieldName]: value });
        }
      } catch(e) {
      }
    }
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value.nativeEvent.text });
    this.storeData(name, value);
    //store to async storage so it is remembered upon reboot
  }

  storeData = async (name, value) => {
    let STORAGE_KEY = "@" + name
      try {
        await AsyncStorage.setItem(STORAGE_KEY, value.nativeEvent.text)
      } catch (e) {
        // saving error
      }
    }

  getData = async (name) => {
    let STORAGE_KEY = "@" + name
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY)
      if(value !== null) {
        // value previously stored
      }
    } catch(e) {
      // error reading value
    }
  }
  

  list = () => {
    return this.state.fieldList.map(element => {
      const fieldName = element.replace(/[^a-zA-Z0-9]/g, '');
      return (
        <Input 
          defaultValue = {this.state[fieldName]}
          placeholder={element} 
          key={element}
          onEndEditing={text => this.handleChange(fieldName, text)}></Input>
      );
    });
  };

  renderTableCell = () => {
    const { navigation } = this.props;
    return (
      <Block flex style={styles.group}>
        {/* <Text bold size={16} style={styles.title}>
          Table Cell
        </Text> */}
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block style={styles.rows}>
            <TouchableOpacity onPress={() => navigation.navigate("Resumes")}>
              <Block row middle space="between" style={{ paddingTop: 7 }}>
                <Text size={20}>Resumes and Documents</Text>
                <Icon
                  name="chevron-right"
                  family="entypo"
                  style={{ paddingRight: 10 }}
                />
              </Block>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => console.log(this.state)}>
              <Block row middle space="between" style={{ paddingTop: 7 }}>
                <Text size={20}>Log State</Text>
                <Icon
                  name="chevron-right"
                  family="entypo"
                  style={{ paddingRight: 10 }}
                />
              </Block>
            </TouchableOpacity> */}
          </Block>
        </Block>
      </Block>
    );
  };
  render() {

    return (
      <Block flex style={styles.profile}>
        <Block flex>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width}}
            >
              <Block right middle style={styles.nameInfo}>
                <Text bold size={28} color="#32325D">
                  John Smith
                </Text>
                <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                  Plano, TX
                </Text>
              </Block>
              <Block left style={styles.avatarContainer}>
                  <Image
                    source={{ uri: Images.ProfilePicture }}
                    style={styles.avatar}
                  />
              </Block>
              <Block middle style={{ marginTop: 30 }}>
                <Block style={styles.divider} />
              {this.renderTableCell()}
                <Block style={styles.divider} />
              </Block>
              <Block flex style={styles.profileCard}>
                
                
                <Block flex>
                  <Block middle>
                  {this.list()}
                      
                    </Block>
                  
                  
                </Block>
              </Block>
            </ScrollView>
        </Block>
        {/* <ScrollView showsVerticalScrollIndicator={false} 
                    contentContainerStyle={{ flex: 1, width, height, zIndex: 9000, backgroundColor: 'red' }}>
        <Block flex style={styles.profileCard}>
          <Block middle style={styles.avatarContainer}>
            <Image
              source={{ uri: Images.ProfilePicture }}
              style={styles.avatar}
            />
          </Block>
          <Block style={styles.info}>
            <Block
              middle
              row
              space="evenly"
              style={{ marginTop: 20, paddingBottom: 24 }}
            >
              <Button small style={{ backgroundColor: argonTheme.COLORS.INFO }}>
                CONNECT
              </Button>
              <Button
                small
                style={{ backgroundColor: argonTheme.COLORS.DEFAULT }}
              >
                MESSAGE
              </Button>
            </Block>

            <Block row space="between">
              <Block middle>
                <Text
                  bold
                  size={12}
                  color="#525F7F"
                  style={{ marginBottom: 4 }}
                >
                  2K
                </Text>
                <Text size={12}>Orders</Text>
              </Block>
              <Block middle>
                <Text bold size={12} style={{ marginBottom: 4 }}>
                  10
                </Text>
                <Text size={12}>Photos</Text>
              </Block>
              <Block middle>
                <Text bold size={12} style={{ marginBottom: 4 }}>
                  89
                </Text>
                <Text size={12}>Comments</Text>
              </Block>
            </Block>
          </Block>
          <Block flex>
              <Block middle style={styles.nameInfo}>
                <Text bold size={28} color="#32325D">
                  Jessica Jones, 27
                </Text>
                <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                  San Francisco, USA
                </Text>
              </Block>
              <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                <Block style={styles.divider} />
              </Block>
              <Block middle>
                <Text size={16} color="#525F7F" style={{ textAlign: "center" }}>
                  An artist of considerable range, Jessica name taken by
                  Melbourne …
                </Text>
                <Button
                  color="transparent"
                  textStyle={{
                    color: "#233DD2",
                    fontWeight: "500",
                    fontSize: 16
                  }}
                >
                  Show more
                </Button>
              </Block>
              <Block
                row
                style={{ paddingVertical: 14, alignItems: "baseline" }}
              >
                <Text bold size={16} color="#525F7F">
                  Album
                </Text>
              </Block>
              <Block
                row
                style={{ paddingBottom: 20, justifyContent: "flex-end" }}
              >
                <Button
                  small
                  color="transparent"
                  textStyle={{ color: "#5E72E4", fontSize: 12 }}
                >
                  View all
                </Button>
              </Block>
              <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
                <Block row space="between" style={{ flexWrap: "wrap" }}>
                  {Images.Viewed.map((img, imgIndex) => (
                    <Image
                      source={{ uri: img }}
                      key={`viewed-${img}`}
                      resizeMode="cover"
                      style={styles.thumb}
                    />
                  ))}
                </Block>
              </Block>
          </Block>
        </Block>
                  </ScrollView>*/}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  // profile: {
  //   marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
  //   // marginBottom: -HeaderHeight * 2,
  //   flex: 1
  // },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width: width,
    height: height
  },
  profileCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 10,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  info: {
    paddingHorizontal: 40
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80,
    marginLeft: 20
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 35,
    marginRight: 20
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF",
    marginTop: 10
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  }
});

export default Profile;
