import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import pic from '../assets/Image/landing.png';
import { colors } from '../shared/theme/colors';
import { typography } from '../shared/theme/typography';
import { spacing } from '../shared/theme/spacing';
import {
  scale,
  verticalScale,
  moderateScale,
} from '../shared/utils/responsive';

interface LandingProps {
  onComplete: () => void;
}

const Landing: React.FC<LandingProps> = ({ onComplete }) => {
  const { height } = useWindowDimensions();

  // Hero image takes ~55% of the total screen height
  const heroImageHeight = height * 0.55;

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      {/* 1. Hero Image Section */}
      <View style={[styles.heroContainer, { height: heroImageHeight }]}>
        <Image source={pic} style={styles.heroImage} resizeMode="cover" />
      </View>

      {/* 2. Content Section (Title, Subtitle, CTA Button) */}
      <View style={styles.contentContainer}>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>
            Fall in Love with Coffee in Blissful Delight!
          </Text>
          <Text style={styles.subtitle}>
            Welcome to our cozy coffee corner, where every cup is crafted with
            passion for you.
          </Text>
        </View>

        {/* 3. Action Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={onComplete}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkRoast,
  },
  heroContainer: {
    width: '100%',
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: scale(spacing.lg), // 24 scaled horizontally
    paddingTop: verticalScale(spacing.md),
    paddingBottom: verticalScale(spacing.xl), // 32 scaled for bottom safe clearance
  },
  textWrapper: {
    alignItems: 'center',
  },
  title: {
    ...typography.h1,
    color: colors.frothWhite,
    textAlign: 'center',
    marginBottom: verticalScale(spacing.sm),
    fontSize: moderateScale(30),
    lineHeight: moderateScale(38),
  },
  subtitle: {
    ...typography.body,
    color: colors.mutedGrey,
    textAlign: 'center',
    paddingHorizontal: scale(spacing.xs),
  },
  button: {
    backgroundColor: colors.espresso,
    paddingVertical: verticalScale(16),
    borderRadius: moderateScale(16),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Fills container evenly without manual left/right percentage math
  },
  buttonText: {
    ...typography.button,
    color: colors.frothWhite,
  },
});

export default Landing;
