import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { ChevronLeft, Heart, Star } from 'lucide-react-native';

import { RootStackParams } from '../types/navigation';
import { colors } from '../shared/theme/colors';
import { typography } from '../shared/theme/typography';
import { spacing } from '../shared/theme/spacing';
import {
  scale,
  verticalScale,
  moderateScale,
} from '../shared/utils/responsive';

// 1. Define the strongly typed Screen Props for 'Details'
type Props = StackScreenProps<RootStackParams, 'Details'>;

const DetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  // 2. Extract params passed from HomeScreen with complete TypeScript safety
  const { name, description, price, image } = route.params;

  // Selected cup size state (S, M, L)
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L'>('M');
  const [isFavorite, setIsFavorite] = useState(false);

  const imageSource = typeof image === 'string' ? { uri: image } : image;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Top App Bar with Back & Favorite buttons */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeft size={24} color={colors.darkRoast} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail</Text>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setIsFavorite(!isFavorite)}
        >
          <Heart
            size={22}
            color={isFavorite ? colors.errorRed : colors.darkRoast}
            fill={isFavorite ? colors.errorRed : 'transparent'}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Coffee Hero Image */}
        <Image
          source={imageSource}
          style={styles.heroImage}
          resizeMode="cover"
        />

        {/* Coffee Title & Rating */}
        <View style={styles.infoSection}>
          <Text style={styles.coffeeTitle}>{name}</Text>
          <Text style={styles.coffeeSubtitle}>Ice / Hot</Text>

          <View style={styles.ratingRow}>
            <Star size={18} color="#FBBE21" fill="#FBBE21" />
            <Text style={styles.ratingText}>4.8 </Text>
            <Text style={styles.reviewCount}>(230)</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>

        {/* Size Selector */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Size</Text>
          <View style={styles.sizeRow}>
            {(['S', 'M', 'L'] as const).map(size => {
              const isSelected = selectedSize === size;
              return (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizeButton,
                    isSelected && styles.sizeButtonSelected,
                  ]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text
                    style={[
                      styles.sizeText,
                      isSelected && styles.sizeTextSelected,
                    ]}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Sticky Checkout Bar */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.priceValue}>$ {price}</Text>
        </View>
        <TouchableOpacity style={styles.buyButton} activeOpacity={0.85}>
          <Text style={styles.buyButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(spacing.lg),
    paddingVertical: verticalScale(spacing.sm),
  },
  headerTitle: {
    ...typography.h3,
    color: colors.darkRoast,
    fontSize: moderateScale(18),
  },
  iconButton: {
    padding: scale(spacing.xs),
  },
  scrollContent: {
    paddingHorizontal: scale(spacing.lg),
    paddingBottom: verticalScale(100),
  },
  heroImage: {
    width: '100%',
    height: verticalScale(220),
    borderRadius: moderateScale(16),
    marginVertical: verticalScale(spacing.md),
  },
  infoSection: {
    marginBottom: verticalScale(spacing.sm),
  },
  coffeeTitle: {
    ...typography.h2,
    color: colors.darkRoast,
    fontSize: moderateScale(22),
  },
  coffeeSubtitle: {
    ...typography.caption,
    color: colors.mutedGrey,
    marginTop: verticalScale(2),
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(spacing.xs),
  },
  ratingText: {
    ...typography.button,
    color: colors.darkRoast,
    fontSize: moderateScale(14),
    marginLeft: scale(4),
  },
  reviewCount: {
    ...typography.caption,
    color: colors.mutedGrey,
  },
  divider: {
    height: 1,
    backgroundColor: '#EAEAEA',
    marginVertical: verticalScale(spacing.md),
  },
  section: {
    marginBottom: verticalScale(spacing.md),
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.darkRoast,
    fontSize: moderateScale(16),
    marginBottom: verticalScale(spacing.xs),
  },
  descriptionText: {
    ...typography.body,
    color: colors.mutedGrey,
    lineHeight: moderateScale(22),
  },
  sizeRow: {
    flexDirection: 'row',
    gap: scale(spacing.md),
    marginTop: verticalScale(spacing.xs),
  },
  sizeButton: {
    flex: 1,
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: '#EAEAEA',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeButtonSelected: {
    borderColor: colors.espresso,
    backgroundColor: '#FFF5EE',
  },
  sizeText: {
    ...typography.body,
    color: colors.darkRoast,
  },
  sizeTextSelected: {
    color: colors.espresso,
    fontWeight: '700',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(spacing.lg),
    paddingTop: verticalScale(spacing.sm),
    paddingBottom: verticalScale(spacing.lg),
    borderTopLeftRadius: moderateScale(24),
    borderTopRightRadius: moderateScale(24),
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  priceLabel: {
    ...typography.caption,
    color: colors.mutedGrey,
  },
  priceValue: {
    ...typography.h2,
    color: colors.espresso,
    fontSize: moderateScale(18),
  },
  buyButton: {
    backgroundColor: colors.espresso,
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(36),
    borderRadius: moderateScale(16),
  },
  buyButtonText: {
    ...typography.button,
    color: colors.frothWhite,
  },
});

export default DetailsScreen;
