---
name: expo-playground-patterns
description: |
  Comprehensive UI/animation patterns reference from expo-playground.
  Use when implementing: charts, native sheets, native toolbars, cards,
  card flips, expandable tabs, product grids, dropdowns, parallax,
  onboarding, switches, weather dashboards, masonry grids, video cards,
  journal cards, bottom bars, gradients, Skia charts, glassmorphism,
  dark mode, theme systems, or any animated UI component.
user-invocable: false
---

# Expo Playground UI Patterns Reference

Complete implementation guide for 20+ UI patterns extracted from expo-playground.
Stack: React Native 0.83 + Expo 55 + NativeWind 4 + Reanimated 4 + Skia 2.

---

## FOUNDATION

### Dependencies
```json
{
  "expo": "^55.0.0-preview.7",
  "react": "19.2.0",
  "react-native": "0.83.1",
  "nativewind": "^4.2.1",
  "tailwindcss": "^3.3.2",
  "react-native-reanimated": "~4.2.1",
  "react-native-gesture-handler": "~2.30.0",
  "@shopify/react-native-skia": "^2.4.18",
  "expo-blur": "~55.0.2",
  "expo-linear-gradient": "~55.0.2",
  "expo-mesh-gradient": "~55.0.2",
  "expo-video": "~55.0.2",
  "expo-symbols": "~55.0.2",
  "lottie-react-native": "~7.3.1",
  "lucide-react-native": "^0.562.0",
  "react-native-svg": "15.15.1",
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.0.2"
}
```

### Babel Config
```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['nativewind/babel', { jsxImportSource: 'nativewind' }], 'babel-preset-expo'],
    plugins: ['react-native-worklets/plugin'], // Required for Skia
  };
};
```

### Metro Config
```js
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const config = getDefaultConfig(__dirname);
module.exports = withNativeWind(config, { input: './global.css' });
```

### app.json experiments
```json
{ "experiments": { "tsconfigPaths": true, "reactCompiler": true } }
```

### Reanimated Shared Element Transitions
```json
// package.json
{ "reanimated": { "staticFeatureFlags": { "ENABLE_SHARED_ELEMENT_TRANSITIONS": true } } }
```

---

## THEME SYSTEM

### Architecture: 3-layer theming

**Layer 1: CSS Variables via NativeWind `vars()`**
```ts
// utils/color-theme.ts
import { vars } from 'nativewind';

export const themes = {
  light: vars({
    '--color-primary': '#000000',
    '--color-invert': '#ffffff',
    '--color-secondary': '#ffffff',
    '--color-background': '#F4F4F5',
    '--color-darker': '#F4F4F5',
    '--color-text': '#000000',
    '--color-highlight': '#FF2056',
    '--color-border': 'rgba(0,0,0,0.15)',
  }),
  dark: vars({
    '--color-primary': '#ffffff',
    '--color-invert': '#000000',
    '--color-secondary': '#262626',
    '--color-background': '#0A0A0A',
    '--color-darker': '#000000',
    '--color-text': '#ffffff',
    '--color-highlight': '#FF2056',
    '--color-border': 'rgba(255,255,255,0.15)',
  }),
};
```

**Layer 2: ThemeContext**
```tsx
// app/contexts/ThemeContext.tsx
import { colorScheme } from 'nativewind';

const ThemeContext = createContext({ theme: 'dark', toggleTheme: () => {} });

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('dark');
  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setCurrentTheme(newTheme);
    colorScheme.set(newTheme); // Sync NativeWind dark mode
  };
  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      <StatusBar style={currentTheme === 'dark' ? 'light' : 'dark'} />
      <View style={themes[currentTheme]}>{children}</View>
    </ThemeContext.Provider>
  );
}
```

**Layer 3: Imperative Colors Hook**
```tsx
// app/contexts/ThemeColors.tsx
export default function useThemeColors() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  return {
    icon: isDark ? '#fff' : '#000',
    bg: isDark ? '#0A0A0A' : '#F4F4F5',
    invert: isDark ? '#000' : '#fff',
    secondary: isDark ? '#262626' : '#fff',
    text: isDark ? '#fff' : '#000',
    highlight: '#FF2056',
    border: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
    isDark,
    // ... more colors
  };
}
```

**Tailwind Config**
```js
// tailwind.config.js
module.exports = {
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        invert: 'var(--color-invert)',
        secondary: 'var(--color-secondary)',
        background: 'var(--color-background)',
        text: 'var(--color-text)',
        highlight: 'var(--color-highlight)',
        border: 'var(--color-border)',
        darker: 'var(--color-darker)',
      },
    },
  },
};
```

**Usage**: `bg-background`, `text-text`, `bg-secondary`, `border-border`, `text-highlight`

---

## UTILITY: cn() - Class Merging
```ts
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
```

## UTILITY: useShadow - Cross-Platform Shadows
```ts
// utils/useShadow.ts
export const shadowPresets = {
  small:  { elevation: 3,  shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 2.5,  shadowOffset: { width: 0, height: 1 } },
  medium: { elevation: 8,  shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 5,    shadowOffset: { width: 0, height: 3 } },
  large:  { elevation: 15, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10.84, shadowOffset: { width: 0, height: 10 } },
  card:   { elevation: 4,  shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 3.84, shadowOffset: { width: 0, height: 2 } },
};
// Usage: <View style={shadowPresets.large} className="rounded-2xl bg-secondary">
```

---

## ANIMATION RECIPES

### Spring Configs Reference
| Config | Feel | Use For |
|--------|------|---------|
| `{ damping: 100, stiffness: 600 }` | Fast, snappy | Tabs, card flips, grid reorders |
| `{ damping: 100, stiffness: 900 }` | Very stiff | Chip indicators, card scale |
| `{ damping: 90, stiffness: 700 }` | Quick, slight bounce | Dropdowns, info panels |
| `{ damping: 80, stiffness: 400 }` | Smooth | Image zoom, background transitions |
| `{ damping: 15, stiffness: 150 }` | Soft, elastic | Opacity fade, subtle reveals |
| `{ bounciness: 10, speed: 12 }` | Playful bounce | Switch thumb |
| `{ tension: 100, friction: 8 }` | RN Animated spring | Sliding indicators |

### Easing Reference
| Easing | Usage |
|--------|-------|
| `Easing.out(Easing.cubic)` | Standard arrivals/exits |
| `Easing.bezier(0.25, 0.1, 0.25, 1)` | Apple-style smooth motion |
| `Easing.bezier(0.1, 1, 0.94, 1)` | Snappy expand (bottom bar) |
| `Easing.out(Easing.back(0.5))` | Subtle overshoot entrance |
| `Easing.out(Easing.back(1))` | Visible overshoot |
| `Easing.in(Easing.cubic)` | Exit animations |
| `Easing.inOut(Easing.cubic)` | Symmetric transitions |

### Counting Animation (number interpolation)
```tsx
// Works with RN Animated. For smooth number transitions.
const countAnim = useRef(new Animated.Value(0)).current;
const [displayValue, setDisplayValue] = useState(startValue);

useEffect(() => {
  const start = displayValue;
  const end = targetValue;
  countAnim.setValue(0);
  const listener = countAnim.addListener(({ value }) => {
    setDisplayValue(Math.round(start + (end - start) * value));
  });
  Animated.timing(countAnim, { toValue: 1, duration: 500, useNativeDriver: false }).start();
  return () => countAnim.removeListener(listener);
}, [targetValue]);
```

### Math-Based Stagger (no withDelay)
```tsx
// Each item offsets its progress from a single shared value
const getStaggeredStyle = (index: number) => {
  return useAnimatedStyle(() => {
    const delay = index * 0.08;
    const adjustedProgress = Math.max(0, Math.min(1, (sharedValue.value - delay) / (1 - delay)));
    const opacity = interpolate(adjustedProgress, [0, 0.5, 1], [0, 0, 1]);
    const translateY = interpolate(adjustedProgress, [0, 1], [10, 0]);
    return { opacity, transform: [{ translateY }] };
  });
};
```

### Multi-Stop Interpolation for Staggered Reveals
```tsx
// Content stays hidden for first 30%, tabs fade out early, content fades in late
const tabOpacity = interpolate(value, [0, 0.3, 1], [1, 0, 0]);
const contentOpacity = interpolate(value, [0, 0.3, 0.6, 1], [0, 0, 0, 1]);
const height = interpolate(value, [0, 0.3, 1], [collapsed, collapsed, expanded]);
```

### Data-Synced Fade Transition
```tsx
// Fade out -> change data at midpoint -> fade in
const fadeAnim = useRef(new Animated.Value(1)).current;
const animateTransition = (callback: () => void) => {
  Animated.sequence([
    Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
    Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
  ]).start();
  setTimeout(callback, 200); // Execute at midpoint
};
```

---

## PATTERN: 3D Card Flip

Reanimated shared value + perspective transform + opacity interpolation.

```tsx
const rotation = useSharedValue(0);

const flipCard = () => {
  rotation.value = withSpring(rotation.value === 0 ? 180 : 0, { damping: 100, stiffness: 600 });
};

const frontStyle = useAnimatedStyle(() => ({
  transform: [{ perspective: 1000 }, { rotateY: `${rotation.value}deg` }],
  opacity: interpolate(rotation.value, [0, 90, 180], [1, 0, 0]),
}));

const backStyle = useAnimatedStyle(() => ({
  transform: [{ perspective: 1000 }, { rotateY: `${rotation.value - 180}deg` }],
  opacity: interpolate(rotation.value, [0, 90, 180], [0, 0, 1]),
}));

// Layout: two Animated.Views with position: absolute, full size
<View style={{ height: 450 }}>
  <Animated.View style={[StyleSheet.absoluteFill, frontStyle]}>{/* Front content */}</Animated.View>
  <Animated.View style={[StyleSheet.absoluteFill, backStyle]}>{/* Back content */}</Animated.View>
</View>
```

---

## PATTERN: Glassmorphism / Blur

```tsx
import { BlurView } from 'expo-blur';

// Light glass (over images)
<BlurView intensity={40} tint="light" style={{ position: 'absolute', ...StyleSheet.absoluteFillObject }}>
  <View style={{ backgroundColor: 'rgba(255,255,255,0)' }} />
</BlurView>

// Dark glass (bottom bars, tooltips)
<BlurView intensity={10} tint="dark" className="rounded-full overflow-hidden bg-black/50">
  {/* Content */}
</BlurView>

// Glass button
<BlurView intensity={80} tint="light" style={{ width: 40, height: 40, borderRadius: 20, overflow: 'hidden' }}>
  <Feather name="arrow-left" size={20} color="white" />
</BlurView>
```

---

## PATTERN: Expanding Hotspots (Product Detail)

Interactive hotspots over an image that expand from circle to card with glassmorphism.

```tsx
// Three coordinated shared values for background image
const imageScale = useSharedValue(1);
const imageTranslateX = useSharedValue(0);
const imageTranslateY = useSharedValue(0);

// Each hotspot has: expanded (0|1) + otherExpanded (0|1)
const containerStyle = useAnimatedStyle(() => ({
  width: interpolate(expanded.value, [0, 1], [34, 220]),
  height: interpolate(expanded.value, [0, 1], [34, 130]),
  borderRadius: interpolate(expanded.value, [0, 1], [24, 20]),
  opacity: interpolate(otherExpanded.value, [0, 1], [1, 0]),    // Hide when sibling expands
  transform: [{ scale: interpolate(otherExpanded.value, [0, 1], [1, 0.6]) }],
}));

// Plus icon rotates 45deg to become X
const iconStyle = useAnimatedStyle(() => ({
  transform: [{ rotate: `${interpolate(expanded.value, [0, 1], [0, 45])}deg` }],
}));

// Content reveal with delay (appears after 20% expansion)
const contentStyle = useAnimatedStyle(() => {
  const progress = Math.max(0, Math.min(1, (expanded.value - 0.2) / 0.8));
  return {
    opacity: interpolate(progress, [0, 0.5, 1], [0, 0, 1]),
    transform: [{ translateY: interpolate(progress, [0, 1], [40, 0]) }],
  };
});

// On tap: image zooms to hotspot area
imageScale.value = withSpring(product.scale, { damping: 80, stiffness: 400 });
imageTranslateX.value = withSpring(product.imageOffset.x, { damping: 80, stiffness: 400 });
imageTranslateY.value = withSpring(product.imageOffset.y, { damping: 80, stiffness: 400 });
```

---

## PATTERN: Hero Transition (Notes/Card Expand)

Measure card position, open modal, animate from card position to centered modal.

```tsx
// Step 1: Measure card position
const cardRef = useRef<View>(null);
cardRef.current?.measureInWindow((x, y, width, height) => {
  setCardLayout({ x, y, width, height });
  setSelectedNote(note);
});

// Step 2: In modal, animate from measured position to center
const progress = useSharedValue(0);
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const targetWidth = SCREEN_WIDTH - 32;
const targetHeight = SCREEN_HEIGHT * 0.75;

const cardStyle = useAnimatedStyle(() => ({
  position: 'absolute',
  left: interpolate(progress.value, [0, 1], [layout.x, 16]),
  top: interpolate(progress.value, [0, 1], [layout.y, (SCREEN_HEIGHT - targetHeight) / 2]),
  width: interpolate(progress.value, [0, 1], [layout.width, targetWidth]),
  height: interpolate(progress.value, [0, 1], [layout.height, targetHeight]),
  borderRadius: interpolate(progress.value, [0, 1], [16, 24]),
  overflow: 'hidden',
}));

// Step 3: Multi-phase open animation
// Phase 1: Fade out small text (100ms)
smallTextOpacity.value = withTiming(0, { duration: 100 });
// Phase 2: Expand card (280ms, delayed 100ms)
progress.value = withDelay(100, withTiming(1, { duration: 280, easing: Easing.out(Easing.cubic) }));
// Phase 3: Fade in expanded text (200ms, delayed 380ms)
expandedTextOpacity.value = withDelay(380, withTiming(1, { duration: 200 }));
```

---

## PATTERN: Expandable Bottom Tab Bar

Panel that expands from tab bar to full profile/menu. Pan gesture + spring.

```tsx
const isExpanded = useSharedValue(0);

// Container height with multi-stop interpolation
const containerStyle = useAnimatedStyle(() => ({
  height: interpolate(isExpanded.value, [0, 0.3, 1], [70 + insets.bottom, 70 + insets.bottom, windowHeight / 1.6]),
}));

// Tab icons fade out early
const tabIconsStyle = useAnimatedStyle(() => ({
  transform: [{ translateY: interpolate(isExpanded.value, [0, 0.3, 1], [0, 20, 20]) }],
  opacity: interpolate(isExpanded.value, [0, 0.3, 1], [1, 0, 0]),
}));

// Expanded content fades in late
const expandedContentStyle = useAnimatedStyle(() => ({
  opacity: interpolate(isExpanded.value, [0, 0.3, 0.6, 1], [0, 0, 0, 1]),
  transform: [{ translateY: interpolate(isExpanded.value, [0, 0.3, 0.6, 1], [20, 20, 20, 0]) }],
}));

// Plus icon rotates to X
const plusIconStyle = useAnimatedStyle(() => ({
  transform: [{ rotate: `${interpolate(isExpanded.value, [0, 1], [0, 135])}deg` }],
}));

// Pan gesture with threshold snapping
const panGesture = Gesture.Pan()
  .onUpdate((e) => {
    if (isExpanded.value > 0 && e.translationY > 0) {
      const progress = 1 - (e.translationY / (expandedHeight - collapsedHeight));
      isExpanded.value = Math.max(progress, 0);
    }
  })
  .onEnd((e) => {
    if (e.translationY < -100) isExpanded.value = withSpring(1, { damping: 100, stiffness: 600 });
    else if (e.translationY > 100) isExpanded.value = withSpring(0, { damping: 100, stiffness: 600 });
    else isExpanded.value = withSpring(isExpanded.value > 0.5 ? 1 : 0, { damping: 100, stiffness: 600 });
  });

// Prevent taps when collapsed
<View pointerEvents={isExpanded.value > 0.5 ? 'auto' : 'none'}>
```

---

## PATTERN: Animated Dropdown Menu

Single shared value drives morphing container + staggered items.

```tsx
const isExpanded = useSharedValue(0);
const toggle = () => {
  isExpanded.value = withSpring(isExpanded.value === 0 ? 1 : 0, { damping: 90, stiffness: 700 });
};

// Container morphs
const containerStyle = useAnimatedStyle(() => ({
  width: interpolate(isExpanded.value, [0, 1], [160, 260]),
  height: interpolate(isExpanded.value, [0, 1], [48, 290]),
  borderRadius: 30,
}));

// Avatar scales up
const avatarStyle = useAnimatedStyle(() => ({
  transform: [
    { scale: interpolate(isExpanded.value, [0, 1], [1, 1.3]) },
    { translateX: interpolate(isExpanded.value, [0, 1], [0, 10]) },
  ],
}));

// Chevron rotation
const chevronStyle = useAnimatedStyle(() => ({
  transform: [{ rotate: `${interpolate(isExpanded.value, [0, 1], [0, 180])}deg` }],
}));

// Staggered link items (see Math-Based Stagger recipe above)
```

---

## PATTERN: Animated Bar Chart

```tsx
// Each bar: Animated height + LinearGradient fill
const ChartBar = ({ height, dataIndex }) => {
  const animatedHeight = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(animatedHeight, { toValue: height, duration: 500, useNativeDriver: false }).start();
  }, [height, dataIndex]);

  return (
    <Animated.View style={{ height: animatedHeight, minHeight: 2 }} className="w-full rounded-t-sm">
      <LinearGradient colors={['#FF2056', '#FF637E']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={{ flex: 1 }} />
    </Animated.View>
  );
};

// Layout: flex-row items-end justify-between, fixed container height
<View className="flex-row items-end justify-between" style={{ height: 150 }}>
  {data.map((item, i) => <ChartBar key={i} height={item.normalizedHeight} dataIndex={selectedIndex} />)}
</View>
```

---

## PATTERN: Native Sheet (iOS)

Configure in Expo Router Stack.Screen options:

```tsx
// In _layout.tsx
<Stack.Screen
  name="screens/native-sheet"
  options={{
    presentation: 'formSheet',
    sheetGrabberVisible: true,
    sheetAllowedDetents: [0.4],
    sheetCornerRadius: 24,
    headerShown: false,
  }}
/>

// The screen itself: blur overlay + centered content + bottom CTA
<View className="flex-1 relative bg-black/10 px-10" style={{ paddingBottom: insets.bottom }}>
  <BlurView intensity={10} tint="dark" style={StyleSheet.absoluteFillObject} />
  <View className="flex-1 justify-center items-center">
    <View className="w-20 h-20 rounded-full bg-white/10 items-center justify-center">
      <Feather name="check" size={40} color="white" />
    </View>
    <Text className="text-white text-3xl font-bold mt-6">Added to cart</Text>
  </View>
  <Pressable className="bg-white rounded-full py-4 items-center" onPress={() => router.back()}>
    <Text className="text-black text-lg font-semibold">Go to checkout</Text>
  </Pressable>
</View>
```

---

## PATTERN: Native Toolbar (iOS only)

Expo Router v7 Stack.Toolbar API:

```tsx
if (Platform.OS !== 'ios') return <Text>iOS only</Text>;

<Stack.Toolbar placement="bottom">
  <Stack.Toolbar.Spacer />
  <Stack.Toolbar.Button icon="info.circle" selected={isOpen} onPress={toggle} variant="plain" />
  <Stack.Toolbar.View hidden={!isOpen}>
    <View className="flex-row items-center w-[80px]"><Text>Content</Text></View>
  </Stack.Toolbar.View>
  <Stack.Toolbar.Spacer />
  <Stack.Toolbar.Menu icon="ellipsis">
    <Stack.Toolbar.Menu inline title="Sort By">
      <Stack.Toolbar.MenuAction isOn={sort === 'recent'} onPress={() => setSort('recent')}>
        Recently Added
      </Stack.Toolbar.MenuAction>
    </Stack.Toolbar.Menu>
    <Stack.Toolbar.MenuAction icon="trash" destructive>Delete All</Stack.Toolbar.MenuAction>
  </Stack.Toolbar.Menu>
  <Stack.Toolbar.Button icon="bag" onPress={() => router.push('/sheet')} />
  <Stack.Toolbar.Spacer />
</Stack.Toolbar>
```

---

## PATTERN: Animated Filter Grid (Product Grid)

Reanimated layout animations for filterable grids.

```tsx
import { FadeInDown, FadeOutUp, LinearTransition, FadeInLeft } from 'react-native-reanimated';

// Sorted data triggers layout animation
const sortedProducts = [...PRODUCTS].sort((a, b) => {
  switch (activeFilter) {
    case 'rating': return b.rating - a.rating;
    case 'price': return a.price - b.price;
    default: return 0;
  }
});

// Grid item with staggered enter + layout transition
<Animated.View
  entering={FadeInDown.delay(index * 50).springify().damping(100).stiffness(600)}
  exiting={FadeOutUp.springify()}
  layout={LinearTransition.springify(0).damping(80).stiffness(600)}
  className="w-1/2 h-[240px] p-1.5"
>
  <ImageBackground source={item.image} className="w-full h-full rounded-2xl overflow-hidden">
    <LinearGradient colors={['transparent', 'rgba(0,0,0,0.2)']} style={{ flex: 1, padding: 16 }}>
      <Text className="text-white font-bold">{item.title}</Text>
    </LinearGradient>
  </ImageBackground>
</Animated.View>

// Filter chip with animated pill indicator
const Chip = ({ isActive, title, onPress }) => (
  <Pressable onPress={onPress} className="relative rounded-full px-4 py-2 bg-secondary overflow-hidden">
    {isActive && (
      <Animated.View entering={FadeInLeft.springify().damping(100).stiffness(900)}
        className="absolute inset-0 bg-primary rounded-full" />
    )}
    <Text className={`text-sm font-semibold relative z-10 ${isActive ? 'text-invert' : 'text-text'}`}>{title}</Text>
  </Pressable>
);
```

---

## PATTERN: Expandable Video Card

```tsx
import { useVideoPlayer, VideoView } from 'expo-video';

const player = useVideoPlayer(videoUrl, p => { p.loop = true; p.play(); });

// Three parallel animations: opacity, height, translateY
const expand = () => {
  Animated.parallel([
    Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true, easing: Easing.out(Easing.ease) }),
    Animated.timing(heightAnim, { toValue: 400, duration: 400, useNativeDriver: false, easing: Easing.out(Easing.cubic) }),
    Animated.timing(translateYAnim, { toValue: 60, duration: 400, useNativeDriver: true, easing: Easing.out(Easing.back(1)) }),
  ]).start();
};

// Layout: VideoView behind gradient overlay with title/description/play button
<Animated.View style={{ height: heightAnim }} className="w-full bg-secondary rounded-2xl overflow-hidden">
  <Animated.View style={{ opacity: fadeAnim, zIndex: 30 }}>
    <LinearGradient colors={['transparent', 'rgba(0,0,0,0.6)']} style={{ flex: 1 }}>
      {/* Duration badge, title, description, BlurView play button */}
    </LinearGradient>
  </Animated.View>
  <VideoView player={player} nativeControls={false} style={{ width: '100%', height: 500 }} />
</Animated.View>
```

---

## PATTERN: Expandable Journal Card

```tsx
const [isExpanded, setIsExpanded] = useState(false);
const imageHeightAnim = useRef(new Animated.Value(0)).current;
const contentOpacityAnim = useRef(new Animated.Value(0)).current;

useEffect(() => {
  Animated.parallel([
    Animated.timing(imageHeightAnim, {
      toValue: isExpanded ? 250 : 0, duration: 400,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1), useNativeDriver: false,
    }),
    Animated.timing(contentOpacityAnim, {
      toValue: isExpanded ? 1 : 0, duration: 500,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1), useNativeDriver: true,
    }),
  ]).start();
}, [isExpanded]);

<Pressable onPress={() => setIsExpanded(!isExpanded)} style={shadowPresets.large}
  className="bg-secondary overflow-hidden mb-6 rounded-2xl">
  <Animated.View style={{ height: imageHeightAnim, borderTopLeftRadius: 20, borderTopRightRadius: 20, overflow: 'hidden' }}>
    <Image source={{ uri: imageUrl }} className="w-full h-full" />
  </Animated.View>
  <View className="p-6">
    <Text className="text-sm text-text">{date}</Text>
    <Text className="text-xl font-lora text-text">{title}</Text>
    <Animated.View style={{ opacity: contentOpacityAnim }}>
      <Text className="text-base text-neutral-500 dark:text-neutral-400">{description}</Text>
    </Animated.View>
  </View>
</Pressable>
```

---

## PATTERN: Parallax Carousel

```tsx
const scrollX = useRef(new Animated.Value(0)).current;

// Three layers with different parallax speeds
const bannerTranslateX = scrollX.interpolate({
  inputRange: [(index - 1) * WIDTH, index * WIDTH, (index + 1) * WIDTH],
  outputRange: [-WIDTH * 0.2, 0, WIDTH * 0.2], extrapolate: 'clamp',
});
const imageTranslateX = scrollX.interpolate({
  inputRange: [(index - 1) * WIDTH, index * WIDTH, (index + 1) * WIDTH],
  outputRange: [-WIDTH * 0.1, 0, WIDTH * 0.1], extrapolate: 'clamp',
});
const boxTranslateX = scrollX.interpolate({
  inputRange: [(index - 1) * WIDTH, index * WIDTH, (index + 1) * WIDTH],
  outputRange: [WIDTH * 0.15, 0, -WIDTH * 0.15], extrapolate: 'clamp', // Opposite direction
});

<Animated.FlatList
  horizontal pagingEnabled snapToInterval={WIDTH}
  onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
  scrollEventThrottle={16}
/>
```

---

## PATTERN: Masonry Grid with Parallax Column

```tsx
const scrollY = useRef(new Animated.Value(0)).current;
const parallax = scrollY.interpolate({ inputRange: [0, 1], outputRange: [0, 0.2] });

<Animated.ScrollView
  onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
  scrollEventThrottle={16}
>
  <View className="flex-row">
    <View className="flex-col w-1/2 pr-1">
      {leftColumn.map(item => <MasonryItem key={item.id} source={item.source} height={item.height} />)}
    </View>
    <Animated.View className="flex-col w-1/2 pl-1" style={{ transform: [{ translateY: parallax }] }}>
      {rightColumn.map(item => <MasonryItem key={item.id} source={item.source} height={item.height} />)}
    </Animated.View>
  </View>
</Animated.ScrollView>

const MasonryItem = ({ source, height, text }) => (
  <ImageBackground source={source} style={{ height }} className="w-full rounded-2xl overflow-hidden mb-2">
    {text && <LinearGradient colors={['transparent', 'rgba(0,0,0,0.3)']} style={{ flex: 1, justifyContent: 'flex-end', padding: 16 }}>
      <Text className="text-white font-bold text-lg">{text}</Text>
    </LinearGradient>}
  </ImageBackground>
);
```

---

## PATTERN: Onboarding with Lottie

```tsx
import LottieView from 'lottie-react-native';

const slides = [
  { id: '1', title: 'Welcome', image: require('@/assets/lottie/welcome.json'), description: '...' },
];

<FlatList
  horizontal pagingEnabled snapToInterval={WIDTH} decelerationRate="fast"
  renderItem={({ item }) => (
    <View style={{ width: WIDTH }} className="items-center justify-center p-6">
      <LottieView autoPlay source={item.image} style={{ width: WIDTH / 1.1, height: WIDTH / 1.1 }} />
      <Text className="text-3xl font-bold mt-4 text-text">{item.title}</Text>
      <Text className="text-center w-2/3 text-text mt-2 opacity-50">{item.description}</Text>
    </View>
  )}
/>

// Thin line dot indicators
<View className="flex-row items-center justify-center">
  {slides.map((_, i) => (
    <View key={i} className={`h-[2px] mx-px rounded-full ${i === currentIndex ? 'bg-highlight w-4' : 'bg-neutral-300 w-4'}`} />
  ))}
</View>
```

---

## PATTERN: Custom Animated Switch

```tsx
const slideAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

const toggle = () => {
  const newValue = !currentValue;
  onChange?.(newValue);
  Animated.spring(slideAnim, { toValue: newValue ? 1 : 0, useNativeDriver: true, bounciness: 10, speed: 12 }).start();
};

<TouchableOpacity onPress={toggle} activeOpacity={0.8} className="flex-row items-center p-4">
  <View className="w-12 h-12 rounded-full bg-background items-center justify-center mr-4">
    <Feather name={icon} size={18} color={colors.icon} />
  </View>
  <View className="flex-1">
    <Text className="font-semibold text-base text-text">{label}</Text>
    <Text className="text-xs text-text opacity-50">{description}</Text>
  </View>
  <View className={`w-14 h-8 rounded-full ${isOn ? 'bg-highlight' : 'bg-background'}`}>
    <Animated.View
      style={{ transform: [{ translateX: slideAnim.interpolate({ inputRange: [-0.2, 1.2], outputRange: [1, 28] }) }] }}
      className="w-6 h-6 bg-white rounded-full shadow-sm my-[3px] border border-border"
    />
  </View>
</TouchableOpacity>
```

---

## PATTERN: Gradient Theme Carousel

```tsx
// Background: key prop forces re-mount for enter/exit animations
<Animated.View key={activeTheme.key} entering={FadeIn.duration(600)} exiting={FadeOut.duration(400)}
  style={StyleSheet.absoluteFillObject}>
  <LinearGradient colors={activeTheme.colors} style={{ flex: 1 }} />
</Animated.View>

// Card: scale + opacity spring based on active state
const cardStyle = useAnimatedStyle(() => ({
  transform: [{ scale: withSpring(isActive ? 1 : 0.85, { damping: 100, stiffness: 900 }) }],
  opacity: withSpring(isActive ? 1 : 0.5, { damping: 15, stiffness: 150 }),
}));

// Dot indicator: width + opacity spring
const dotStyle = useAnimatedStyle(() => ({
  width: withSpring(isActive ? 32 : 8, { damping: 100, stiffness: 900 }),
  opacity: withSpring(isActive ? 1 : 0.3, { damping: 100, stiffness: 900 }),
}));

// Carousel config
const CARD_WIDTH = SCREEN_WIDTH * 0.7;
const CARD_SPACING = 10;
<FlatList horizontal snapToInterval={CARD_WIDTH + CARD_SPACING} decelerationRate="fast"
  contentContainerStyle={{ paddingHorizontal: (SCREEN_WIDTH - CARD_WIDTH) / 2 }} />
```

---

## PATTERN: Skia Analytics Chart

Interactive chart with gesture-driven tooltip using Skia + Reanimated + Gesture Handler.

```tsx
import { Canvas, Path, LinearGradient, vec, Circle, Skia, RadialGradient, Line } from '@shopify/react-native-skia';

// 12 shared values for Y positions (one per month)
const animatedYs = data.map(d => useSharedValue(scaleY(d.value)));

// Smooth cubic bezier path from animated points
const linePath = useDerivedValue(() => {
  const path = Skia.Path.Make();
  const points = animatedYs.map((y, i) => ({ x: pointXs[i], y: y.value }));
  path.moveTo(points[0].x, points[0].y);
  const tension = 0.3;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i], p1 = points[i + 1];
    path.cubicTo(p0.x + (p1.x - p0.x) * tension, p0.y, p1.x - (p1.x - p0.x) * tension, p1.y, p1.x, p1.y);
  }
  return path;
});

// Gradient stroke
<Canvas style={{ width: chartWidth, height: 220 }}>
  <Path path={linePath} style="stroke" strokeWidth={3} strokeCap="round" strokeJoin="round">
    <LinearGradient start={vec(0, 0)} end={vec(chartWidth, 0)}
      colors={['#FBBF72', '#F9A855', '#6EE7B7', '#34D399']} />
  </Path>
</Canvas>

// Pan gesture for tooltip
const gesture = Gesture.Pan()
  .onBegin((e) => {
    'worklet';
    isActive.value = true;
    const idx = getNearestIndex(e.x);
    smoothX.value = pointXs[idx];
    smoothY.value = animatedYs[idx].value;
    tooltipScale.value = withSpring(1, { damping: 90, stiffness: 600 });
    runOnJS(updateTooltip)(idx);
  })
  .onUpdate((e) => { 'worklet'; runOnJS(updateTooltip)(getNearestIndex(e.x)); })
  .onEnd(() => { 'worklet'; tooltipScale.value = withTiming(0, { duration: 150 }); });

// Tooltip: BlurView + LinearGradient + border
<Animated.View style={tooltipStyle} pointerEvents="none">
  <BlurView intensity={30} tint="dark" style={{ borderRadius: 20, overflow: 'hidden' }}>
    <LinearGradient colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']}
      style={{ padding: 10, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}>
      <Text className="text-text text-xl font-bold">${value}k</Text>
    </LinearGradient>
  </BlurView>
</Animated.View>
```

---

## PATTERN: Weather Dashboard

Key sub-patterns:
- **Sliding tab indicator**: Animated.spring with percentage-based `left` position
- **Precipitation bars**: Staggered height animations (`delay: index * 20`)
- **Temperature counter**: Number interpolation via addListener
- **Weather icon transition**: scale(0.8->1) + rotate(-15->0->15) + fade

```tsx
// Sliding indicator
const SlidingIndicator = ({ currentIndex, count }) => {
  const slideAnim = useRef(new Animated.Value(currentIndex)).current;
  useEffect(() => {
    Animated.spring(slideAnim, { toValue: currentIndex, useNativeDriver: false, tension: 100, friction: 8 }).start();
  }, [currentIndex]);
  const left = slideAnim.interpolate({
    inputRange: Array.from({ length: count }, (_, i) => i),
    outputRange: Array.from({ length: count }, (_, i) => `${(i / count) * 100 + 100 / count / 4}%`),
  });
  return <Animated.View className="absolute -top-px h-1 bg-background rounded-b-full" style={{ width: `${100 / count / 2}%`, left }} />;
};

// Staggered precipitation bars
const PrecipitationBar = ({ height, index, dayIndex }) => {
  const animatedHeight = useRef(new Animated.Value(8)).current;
  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: height, duration: 400, delay: index * 20, useNativeDriver: false,
    }).start();
  }, [height, dayIndex]);
  return <Animated.View className="rounded-full bg-highlight w-full" style={{ height: animatedHeight }} />;
};
```

---

## PATTERN: Bottom Camera Bar

Blurred pill-shaped bar with expanding active item.

```tsx
// Active item: width 40->100, text slides in
<View style={shadowPresets.card} className="rounded-full border border-white/20">
  <BlurView tint="dark" intensity={10} className="flex-row py-1.5 px-1 w-[300px] overflow-hidden rounded-full bg-black/50">
    {items.map(item => <BottomBarItem key={item.icon} isActive={active === item.icon} onPress={() => setActive(item.icon)} />)}
  </BlurView>
</View>

// Camera shutter button
<View className="w-20 h-20 p-2 mx-auto rounded-full border border-white items-center justify-center">
  <View style={{ elevation: 10, shadowColor: 'black', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 10 }}
    className="w-full h-full rounded-full bg-white" />
</View>
```

---

## PATTERN: Theme Toggle (Animated Icon)

```tsx
const animateIcon = () => {
  if (isAnimating) return;
  setIsAnimating(true);
  Animated.sequence([
    Animated.parallel([
      Animated.timing(scale, { toValue: 0.9, duration: 200, useNativeDriver: true }),
      Animated.timing(rotate, { toValue: 45, duration: 200, useNativeDriver: true }),
    ]),
    Animated.parallel([
      Animated.timing(scale, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.timing(rotate, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]),
  ]).start(() => setIsAnimating(false));
};
// Icon: sun (dark mode) / moon (light mode)
```

---

## LAYOUT RECIPES

### Screen Wrapper
```tsx
<>
  <Header showBackButton />
  <View className="flex-1 bg-background">{/* Content */}</View>
</>
```

### Two-Column Masonry
```tsx
const left = items.filter((_, i) => i % 2 === 0);
const right = items.filter((_, i) => i % 2 === 1);
<View className="flex-row gap-3">
  <View className="flex-1">{left.map(renderItem)}</View>
  <View className="flex-1">{right.map(renderItem)}</View>
</View>
```

### Two-Column Grid
```tsx
<View className="flex-row flex-wrap px-4">
  {items.map((item, i) => (
    <View key={item.id} className="w-1/2 h-[240px] p-1.5">{/* Card */}</View>
  ))}
</View>
```

### Carousel with Centered Active Item
```tsx
const CARD_WIDTH = SCREEN_WIDTH * 0.7;
const SPACING = 10;
<FlatList
  horizontal
  snapToInterval={CARD_WIDTH + SPACING}
  decelerationRate="fast"
  contentContainerStyle={{ paddingHorizontal: (SCREEN_WIDTH - CARD_WIDTH) / 2 }}
/>
```

### Image + Gradient Overlay
```tsx
<ImageBackground source={image} className="w-full h-full rounded-2xl overflow-hidden">
  <LinearGradient colors={['transparent', 'rgba(0,0,0,0.3)']} style={{ flex: 1, justifyContent: 'flex-end', padding: 16 }}>
    <Text className="text-white font-bold">{title}</Text>
  </LinearGradient>
</ImageBackground>
```

### Card Base
```tsx
<View style={shadowPresets.large} className="bg-secondary rounded-2xl overflow-hidden">
  {/* Card content */}
</View>
```

### Dot Indicators
```tsx
// Round dots
<View className="flex-row items-center justify-center">
  {items.map((_, i) => (
    <View key={i} className={`h-2 w-2 mx-1 rounded-full ${i === active ? 'bg-white' : 'bg-white/30'}`} />
  ))}
</View>

// Thin line dots (modern)
{items.map((_, i) => (
  <View key={i} className={`h-[2px] w-4 mx-px rounded-full ${i === active ? 'bg-highlight' : 'bg-neutral-300'}`} />
))}
```

---

## VISUAL RECIPES

### Duration Badge
```tsx
<Text className="bg-black/70 px-2 py-1 rounded-full text-white text-xs">{duration}</Text>
```

### Close Button (Top Right)
```tsx
<Pressable className="p-3 rounded-full bg-white/5 absolute top-4 right-4" onPress={onClose}>
  <Feather name="x" size={20} color="white" />
</Pressable>
```

### Auth Buttons Row
```tsx
<Pressable style={shadowPresets.card} className="bg-white rounded-full py-4 flex-row items-center justify-center">
  <Image source={googleIcon} className="w-5 h-5 mr-3" />
  <Text className="text-black font-semibold">Continue with Email</Text>
</Pressable>
<View className="flex-row gap-3 mt-3">
  <Pressable className="flex-1 bg-black rounded-full py-4 items-center"><Text className="text-white">Google</Text></Pressable>
  <Pressable className="flex-1 bg-black rounded-full py-4 items-center"><Text className="text-white">Apple</Text></Pressable>
</View>
```

### Settings Group Card
```tsx
<View style={shadowPresets.card} className="rounded-3xl bg-secondary">
  <Switch label="GPS" icon="compass" className="border-b border-border" />
  <Switch label="Rest" icon="coffee" className="border-b border-border" />
  <Switch label="Timer" icon="clock" /> {/* Last item: no border */}
</View>
```
