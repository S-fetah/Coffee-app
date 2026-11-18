import React, { Component, ErrorInfo, ReactNode } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { verticalScale, scale, moderateScale } from '../utils/responsive';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Production note: Log error and component stack to Sentry / Bugsnag / Crashlytics here
    console.error('Unhandled Application Crash:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <View style={styles.container}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={colors.darkRoast}
          />
          <View style={styles.content}>
            <Text style={styles.emoji}>☕⚠️</Text>
            <Text style={styles.title}>Oops! Something spilled.</Text>
            <Text style={styles.message}>
              We encountered an unexpected issue while loading this screen.
            </Text>

            {__DEV__ && this.state.error && (
              <View style={styles.devErrorBox}>
                <Text style={styles.devErrorText}>
                  {this.state.error.toString()}
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.retryButton}
              onPress={this.handleReset}
              activeOpacity={0.8}
            >
              <Text style={styles.retryButtonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkRoast,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(24),
  },
  content: {
    alignItems: 'center',
    maxWidth: 400,
    width: '100%',
  },
  emoji: {
    fontSize: moderateScale(48),
    marginBottom: verticalScale(16),
  },
  title: {
    ...typography.h2,
    color: colors.frothWhite,
    textAlign: 'center',
    marginBottom: verticalScale(8),
  },
  message: {
    ...typography.body,
    color: colors.mutedGrey,
    textAlign: 'center',
    marginBottom: verticalScale(24),
  },
  devErrorBox: {
    backgroundColor: 'rgba(237, 81, 81, 0.15)',
    padding: moderateScale(12),
    borderRadius: 8,
    marginBottom: verticalScale(24),
    width: '100%',
    borderColor: colors.errorRed,
    borderWidth: 1,
  },
  devErrorText: {
    ...typography.caption,
    color: colors.errorRed,
  },
  retryButton: {
    backgroundColor: colors.espresso,
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(32),
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
  },
  retryButtonText: {
    ...typography.button,
    color: colors.frothWhite,
  },
});
