import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
  Platform,
  Alert,
  Animated,
  Pressable,
  Easing,
  Dimensions,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { supabase } from './supabase'; // استيراد الاتصال بقاعدة البيانات

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ==========================================
// 1. خلفية الشركة الفخمة المتحركة
// ==========================================
const CorporateLiveBackground = () => {
  const radarPulse1 = useRef(new Animated.Value(0)).current;
  const radarPulse2 = useRef(new Animated.Value(0)).current;
  const orbFloat = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(radarPulse1, {
        toValue: 1,
        duration: 4000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      })
    ).start();

    setTimeout(() => {
      Animated.loop(
        Animated.timing(radarPulse2, {
          toValue: 1,
          duration: 4000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        })
      ).start();
    }, 2000);

    Animated.loop(
      Animated.sequence([
        Animated.timing(orbFloat, { toValue: 1, duration: 3500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(orbFloat, { toValue: 0, duration: 3500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const ring1Scale = radarPulse1.interpolate({ inputRange: [0, 1], outputRange: [0.4, 2.8] });
  const ring1Opacity = radarPulse1.interpolate({ inputRange: [0, 0.7, 1], outputRange: [0.55, 0.2, 0] });
  const ring2Scale = radarPulse2.interpolate({ inputRange: [0, 1], outputRange: [0.4, 2.8] });
  const ring2Opacity = radarPulse2.interpolate({ inputRange: [0, 0.7, 1], outputRange: [0.55, 0.2, 0] });
  const orbTranslateY = orbFloat.interpolate({ inputRange: [0, 1], outputRange: [-18, 22] });

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <View style={styles.bgBaseLayer} />
      <Animated.View style={[styles.glowOrbOrange, { transform: [{ translateY: orbTranslateY }] }]} />
      <Animated.View style={[styles.glowOrbBlue, { transform: [{ translateY: orbTranslateY }] }]} />

      <View style={styles.radarCenterBox}>
        <Animated.View style={[styles.radarRing, { transform: [{ scale: ring1Scale }], opacity: ring1Opacity }]} />
        <Animated.View
          style={[styles.radarRing, { borderColor: '#38BDF8', transform: [{ scale: ring2Scale }], opacity: ring2Opacity }]}
        />
      </View>

      <View style={styles.gridOverlay}>
        {Array.from({ length: 12 }).map((_, i) => (
          <View key={i} style={styles.gridHorizontalLine} />
        ))}
      </View>

      <View style={styles.corporateSkylineFooter}>
        {[80, 140, 100, 190, 120, 165, 95, 210, 130, 175, 110, 150, 90].map((h, i) => (
          <View
            key={i}
            style={[
              styles.skyscraperTower,
              {
                height: h,
                backgroundColor: i % 2 === 0 ? 'rgba(30, 41, 59, 0.65)' : 'rgba(15, 23, 42, 0.85)',
              },
            ]}
          >
            {h > 130 && <View style={styles.towerBeaconLight} />}
            <View style={styles.towerGlassLine} />
          </View>
        ))}
      </View>
    </View>
  );
};

// ==========================================
// 2. فيسبا الشركة الفخمة المتحركة
// ==========================================
const ExecutiveVespaTrack = () => {
  const driveAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(driveAnim, { toValue: 1, duration: 3600, easing: Easing.inOut(Easing.cubic), useNativeDriver: true }),
        Animated.timing(driveAnim, { toValue: 0, duration: 3600, easing: Easing.inOut(Easing.cubic), useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, { toValue: -2.5, duration: 160, useNativeDriver: true }),
        Animated.timing(bounceAnim, { toValue: 0, duration: 160, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const trackW = Math.min(SCREEN_WIDTH - 40, 460);
  const scooterX = driveAnim.interpolate({ inputRange: [0, 1], outputRange: [10, trackW - 115] });

  return (
    <View style={styles.fleetTrackCard}>
      <View style={styles.fleetStatusHeader}>
        <Text style={styles.fleetLabel}>أسطول التوصيل المتصل بالسحابة • CLOUD LIVE</Text>
        <View style={styles.activeDot} />
      </View>

      <View style={styles.fleetRoadArea}>
        <Animated.View style={[styles.scooterRoot, { transform: [{ translateX: scooterX }, { translateY: bounceAnim }] }]}>
          <View style={styles.headlightBeam} />
          <View style={styles.scooterUpper}>
            <View style={styles.deliveryBox}><Text style={{ fontSize: 12 }}>⚡</Text></View>
            <View style={styles.scooterSeat} />
            <View style={styles.handlebarStem}><View style={styles.headlightBulb} /></View>
          </View>
          <View style={styles.scooterBodyChassis}><View style={styles.chassisStripe} /></View>
          <View style={styles.wheelsRow}>
            <View style={styles.wheelOuter}><View style={styles.wheelInner} /></View>
            <View style={styles.wheelOuter}><View style={styles.wheelInner} /></View>
          </View>
        </Animated.View>
        <View style={styles.neonRoadLine} />
      </View>
    </View>
  );
};

// ==========================================
// 3. مكون البطاقة الزجاجية التفاعلية
// ==========================================
const GlassInteractiveBox = ({ onPress, style, children, glowColor = '#F97316', hoverScale = 1.025, hoverLift = -5, disabled = false }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;
  const [isHovered, setIsHovered] = useState(false);

  const handleHoverIn = () => {
    if (disabled) return;
    setIsHovered(true);
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: hoverScale, useNativeDriver: true, speed: 28, bounciness: 10 }),
      Animated.spring(translateYAnim, { toValue: hoverLift, useNativeDriver: true, speed: 28, bounciness: 10 }),
    ]).start();
  };

  const handleHoverOut = () => {
    setIsHovered(false);
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 22, bounciness: 8 }),
      Animated.spring(translateYAnim, { toValue: 0, useNativeDriver: true, speed: 22, bounciness: 8 }),
    ]).start();
  };

  const handlePressIn = () => {
    if (disabled) return;
    Animated.spring(scaleAnim, { toValue: 0.96, useNativeDriver: true, speed: 35 }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: isHovered ? hoverScale : 1, useNativeDriver: true, speed: 25 }).start();
  };

  return (
    <Pressable
      onPress={disabled ? null : onPress}
      onHoverIn={handleHoverIn}
      onHoverOut={handleHoverOut}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={Platform.OS === 'web' ? { cursor: disabled ? 'default' : 'pointer' } : undefined}
    >
      <Animated.View
        style={[
          style,
          isHovered && {
            borderColor: glowColor,
            shadowColor: glowColor,
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.45,
            shadowRadius: 22,
          },
          { transform: [{ scale: scaleAnim }, { translateY: translateYAnim }] },
        ]}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
};

export default function App() {
  const [role, setRole] = useState('home');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // بيانات العميل والطلب
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [details, setDetails] = useState('');
  const [phone, setPhone] = useState('');
  const [fee, setFee] = useState('10');

  // بيانات الكابتن والتبويبات
  const [driverName, setDriverName] = useState('');
  const [driverPhone, setDriverPhone] = useState('');
  const [driverTab, setDriverTab] = useState('active'); // 'active' | 'completed'

  // جلب الطلبات من Supabase وتفعيل الاستماع اللحظي
  useEffect(() => {
    fetchOrders();

    const subscription = supabase
      .channel('orders-realtime-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setOrders((prev) => [payload.new, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setOrders((prev) =>
              prev.map((order) => (order.id === payload.new.id ? payload.new : order))
            );
          } else if (payload.eventType === 'DELETE') {
            setOrders((prev) => prev.filter((order) => order.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error.message);
    } else {
      setOrders(data || []);
    }
    setLoading(false);
  };

  const showAlert = (title, message) => {
    if (Platform.OS === 'web') {
      window.alert(message);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleCreateOrder = async () => {
    if (!pickup.trim() || !dropoff.trim() || !details.trim() || !phone.trim()) {
      showAlert('تنبيه', 'يرجى تعبئة جميع الحقول المطلوبة لإرسال الطلب.');
      return;
    }

    setSubmitting(true);
    const orderCode = 'ORD-' + Math.floor(100 + Math.random() * 900);

    const { error } = await supabase.from('orders').insert([
      {
        order_code: orderCode,
        pickup: pickup.trim(),
        dropoff: dropoff.trim(),
        details: details.trim(),
        phone: phone.trim(),
        fee,
        status: 'pending',
      },
    ]);

    setSubmitting(false);

    if (error) {
      showAlert('خطأ', 'حدث خطأ أثناء إرسال الطلب: ' + error.message);
      return;
    }

    setPickup('');
    setDropoff('');
    setDetails('');
    setPhone('');

    showAlert('تم الإرسال 🚀', `تم إرسال طلبك (${orderCode}) إلى السحابة بنجاح! سيظهر الآن للمندوبين.`);
  };

  const updateOrderStatus = async (orderId, nextStatus) => {
    if (nextStatus === 'accepted') {
      if (!driverName.trim() || !driverPhone.trim()) {
        showAlert('بيانات الكابتن مطلوبة', 'يرجى كتابة اسمك ورقم جوالك في بطاقة الكابتن بالأعلى قبل قبول الطلب.');
        return;
      }
    }

    const updatePayload = { status: nextStatus };
    if (nextStatus === 'accepted') {
      updatePayload.driver_name = driverName.trim();
      updatePayload.driver_phone = driverPhone.trim();
    }

    const { error } = await supabase
      .from('orders')
      .update(updatePayload)
      .eq('id', orderId);

    if (error) {
      showAlert('خطأ', 'تعذر تحديث الحالة: ' + error.message);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm('هل أنت متأكد من إلغاء هذا الطلب؟');
      if (!confirmed) return;
      await updateOrderStatus(orderId, 'cancelled');
    } else {
      Alert.alert('إلغاء الطلب', 'هل أنت متأكد من إلغاء هذا الطلب؟', [
        { text: 'تراجع', style: 'cancel' },
        { text: 'نعم، إلغاء', style: 'destructive', onPress: () => updateOrderStatus(orderId, 'cancelled') },
      ]);
    }
  };

  // فتح اتصال هاتفي أو واتساب
  const openPhoneCall = (phoneNumber) => {
    const cleanPhone = phoneNumber.replace(/[^0-9+]/g, '');
    Linking.openURL(`tel:${cleanPhone}`);
  };

  const openWhatsApp = (phoneNumber, orderCode) => {
    let cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
    if (cleanPhone.startsWith('05')) {
      cleanPhone = '970' + cleanPhone.substring(1);
    }
    const text = encodeURIComponent(`مرحباً، معك كابتن SwiftDrop بخصوص طلبك رقم #${orderCode}`);
    const url = `https://wa.me/${cleanPhone}?text=${text}`;
    if (Platform.OS === 'web') {
      window.open(url, '_blank');
    } else {
      Linking.openURL(url);
    }
  };

  const formatTime = (isoString) => {
    if (!isoString) return 'الآن';
    const date = new Date(isoString);
    return date.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return { text: 'بانتظار مندوب ⏳', bg: 'rgba(245, 158, 11, 0.15)', border: '#F59E0B', color: '#FBBF24' };
      case 'accepted':
        return { text: 'المندوب في الطريق 🛵', bg: 'rgba(56, 189, 248, 0.15)', border: '#38BDF8', color: '#7DD3FC' };
      case 'picked_up':
        return { text: 'تم الاستلام وجاري التوصيل 📦', bg: 'rgba(168, 85, 247, 0.15)', border: '#A855F7', color: '#D8B4FE' };
      case 'delivered':
        return { text: 'تم التسليم بنجاح ✅', bg: 'rgba(16, 185, 129, 0.15)', border: '#10B981', color: '#34D399' };
      case 'cancelled':
        return { text: 'ملغي ❌', bg: 'rgba(239, 68, 68, 0.15)', border: '#EF4444', color: '#F87171' };
      default:
        return { text: status, bg: '#1E293B', border: '#475569', color: '#CBD5E1' };
    }
  };

  // ==========================================
  // 1. واجهة العميل
  // ==========================================
  if (role === 'customer') {
    return (
      <SafeAreaView style={styles.darkScreenRoot}>
        <StatusBar barStyle="light-content" backgroundColor="#050814" />
        <CorporateLiveBackground />

        <View style={styles.glassTopNav}>
          <GlassInteractiveBox style={styles.navBackBtn} onPress={() => setRole('home')} glowColor="#38BDF8">
            <Text style={styles.navBackArrow}>→</Text>
          </GlassInteractiveBox>
          <Text style={styles.navHeaderTitle}>إنشاء طلب توصيل</Text>
          <View style={{ width: 42 }} />
        </View>

        <ScrollView contentContainerStyle={styles.innerScroll}>
          <View style={styles.formWrapper}>
            <View style={styles.glassFormCard}>
              <Text style={styles.glassCardTitle}>📍 تفاصيل مسار الشحنة</Text>

              <Text style={styles.darkInputLabel}>نقطة الاستلام (من أين؟)</Text>
              <TextInput
                style={styles.darkInput}
                placeholder="مثال: مطعم التايلندي / سوبرماركت النور"
                placeholderTextColor="#64748B"
                value={pickup}
                onChangeText={setPickup}
              />

              <Text style={styles.darkInputLabel}>نقطة التسليم (إلى أين؟)</Text>
              <TextInput
                style={styles.darkInput}
                placeholder="مثال: حي الرمال - شارع الجلاء - عمارة 12"
                placeholderTextColor="#64748B"
                value={dropoff}
                onChangeText={setDropoff}
              />

              <Text style={styles.darkInputLabel}>تفاصيل الأغراض المطلوبة</Text>
              <TextInput
                style={[styles.darkInput, styles.textArea]}
                placeholder="اكتب قائمة الطلبات أو وصف الطرد..."
                placeholderTextColor="#64748B"
                multiline
                value={details}
                onChangeText={setDetails}
              />

              <Text style={styles.darkInputLabel}>رقم الجوال للتواصل</Text>
              <TextInput
                style={styles.darkInput}
                placeholder="059xxxxxxx"
                placeholderTextColor="#64748B"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />

              <Text style={styles.darkInputLabel}>تكلفة التوصيل (شيكل)</Text>
              <View style={styles.feeRow}>
                {['7', '10', '15', '20'].map((amount) => (
                  <View key={amount} style={{ flex: 1 }}>
                    <GlassInteractiveBox
                      style={[styles.darkFeeChip, fee === amount && styles.darkFeeChipActive]}
                      onPress={() => setFee(amount)}
                      glowColor="#38BDF8"
                    >
                      <Text style={[styles.darkFeeText, fee === amount && styles.darkFeeTextActive]}>
                        {amount} ₪
                      </Text>
                    </GlassInteractiveBox>
                  </View>
                ))}
              </View>

              <GlassInteractiveBox
                style={[styles.neonBlueBtn, submitting && { opacity: 0.6 }]}
                onPress={handleCreateOrder}
                glowColor="#38BDF8"
                disabled={submitting}
              >
                <Text style={styles.neonBtnText}>
                  {submitting ? 'جاري الإرسال للسحابة...' : 'إرسال الطلب للأسطول 🚀'}
                </Text>
              </GlassInteractiveBox>
            </View>

            <Text style={styles.darkSectionHeader}>📋 طلباتي المباشرة ({orders.length})</Text>

            {loading ? (
              <ActivityIndicator size="large" color="#38BDF8" style={{ marginTop: 20 }} />
            ) : orders.length === 0 ? (
              <Text style={styles.emptyText}>لا توجد طلبات حالياً. أنشئ أول طلب بالأعلى!</Text>
            ) : (
              orders.map((order) => {
                const badge = getStatusBadge(order.status);
                return (
                  <GlassInteractiveBox key={order.id} style={styles.glassOrderCard} glowColor="#38BDF8">
                    <View style={styles.orderTopRow}>
                      <View style={[styles.statusBadge, { backgroundColor: badge.bg, borderColor: badge.border }]}>
                        <Text style={[styles.statusBadgeText, { color: badge.color }]}>{badge.text}</Text>
                      </View>
                      <Text style={styles.orderIdText}>#{order.order_code}</Text>
                    </View>

                    <View style={styles.darkRouteBox}>
                      <Text style={styles.darkRouteText}>🟢 من: {order.pickup}</Text>
                      <Text style={styles.darkRouteText}>🔴 إلى: {order.dropoff}</Text>
                    </View>

                    <Text style={styles.darkOrderDetails}>📦 {order.details}</Text>

                    {/* عرض بيانات الكابتن إذا تم قبول الطلب */}
                    {order.driver_name && order.status !== 'cancelled' && (
                      <View style={styles.assignedDriverBox}>
                        <Text style={styles.assignedDriverText}>
                          🛵 الكابتن: {order.driver_name} ({order.driver_phone})
                        </Text>
                        {order.driver_phone && (
                          <View style={styles.contactMiniRow}>
                            <Pressable style={styles.miniCallBtn} onPress={() => openPhoneCall(order.driver_phone)}>
                              <Text style={styles.miniContactText}>📞 اتصال</Text>
                            </Pressable>
                            <Pressable style={styles.miniWaBtn} onPress={() => openWhatsApp(order.driver_phone, order.order_code)}>
                              <Text style={styles.miniContactText}>💬 واتساب</Text>
                            </Pressable>
                          </View>
                        )}
                      </View>
                    )}

                    {/* زر إلغاء الطلب قبل القبول */}
                    {order.status === 'pending' && (
                      <Pressable style={styles.cancelOrderBtn} onPress={() => handleCancelOrder(order.id)}>
                        <Text style={styles.cancelOrderText}>إلغاء الطلب ❌</Text>
                      </Pressable>
                    )}

                    <View style={styles.darkOrderFooter}>
                      <Text style={styles.neonFeeText}>الأجرة: {order.fee} ₪ (كاش)</Text>
                      <Text style={styles.timeText}>{formatTime(order.created_at)}</Text>
                    </View>
                  </GlassInteractiveBox>
                );
              })
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ==========================================
  // 2. واجهة المندوب
  // ==========================================
  if (role === 'driver') {
    const deliveredOrders = orders.filter((o) => o.status === 'delivered');
    const totalEarnings = deliveredOrders.reduce((sum, o) => sum + (parseFloat(o.fee) || 0), 0);

    const activeOrders = orders.filter((o) => ['pending', 'accepted', 'picked_up'].includes(o.status));
    const displayedOrders = driverTab === 'active' ? activeOrders : deliveredOrders;

    return (
      <SafeAreaView style={styles.darkScreenRoot}>
        <StatusBar barStyle="light-content" backgroundColor="#050814" />
        <CorporateLiveBackground />

        <View style={styles.glassTopNav}>
          <GlassInteractiveBox style={styles.navBackBtn} onPress={() => setRole('home')} glowColor="#F97316">
            <Text style={styles.navBackArrow}>→</Text>
          </GlassInteractiveBox>
          <Text style={styles.navHeaderTitle}>غرفة عمليات الكباتن</Text>
          <View style={styles.liveCaptainPill}>
            <View style={styles.liveCaptainDot} />
            <Text style={styles.liveCaptainText}>متصل</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.innerScroll}>
          <View style={styles.formWrapper}>
            {/* لوحة أرباح وإحصائيات الكابتن */}
            <View style={styles.earningsDashboardCard}>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>إجمالي الأرباح المحققة</Text>
                <Text style={styles.statValueOrange}>{totalEarnings} ₪</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>الطلبات المنجزة</Text>
                <Text style={styles.statValueGreen}>{deliveredOrders.length} طلب</Text>
              </View>
            </View>

            {/* بطاقة تعريف الكابتن */}
            <View style={styles.driverProfileCard}>
              <Text style={styles.driverProfileTitle}>🪪 بطاقة الكابتن (تظهر للعميل عند قبول الطلب)</Text>
              <View style={styles.driverInputsRow}>
                <TextInput
                  style={[styles.darkInput, { flex: 1 }]}
                  placeholder="اسم الكابتن"
                  placeholderTextColor="#64748B"
                  value={driverName}
                  onChangeText={setDriverName}
                />
                <TextInput
                  style={[styles.darkInput, { flex: 1 }]}
                  placeholder="جوال الكابتن 059..."
                  placeholderTextColor="#64748B"
                  keyboardType="phone-pad"
                  value={driverPhone}
                  onChangeText={setDriverPhone}
                />
              </View>
            </View>

            {/* تبويبات الطلبات */}
            <View style={styles.tabsRow}>
              <Pressable
                style={[styles.tabBtn, driverTab === 'active' && styles.tabBtnActive]}
                onPress={() => setDriverTab('active')}
              >
                <Text style={[styles.tabBtnText, driverTab === 'active' && styles.tabBtnTextActive]}>
                  📡 الطلبات النشطة ({activeOrders.length})
                </Text>
              </Pressable>
              <Pressable
                style={[styles.tabBtn, driverTab === 'completed' && styles.tabBtnActive]}
                onPress={() => setDriverTab('completed')}
              >
                <Text style={[styles.tabBtnText, driverTab === 'completed' && styles.tabBtnTextActive]}>
                  ✅ المكتملة ({deliveredOrders.length})
                </Text>
              </Pressable>
            </View>

            {loading ? (
              <ActivityIndicator size="large" color="#F97316" style={{ marginTop: 20 }} />
            ) : displayedOrders.length === 0 ? (
              <Text style={styles.emptyText}>
                {driverTab === 'active'
                  ? 'لا توجد طلبات نشطة حالياً. بانتظار طلبات جديدة...'
                  : 'لا توجد طلبات مكتملة في السجل بعد.'}
              </Text>
            ) : (
              displayedOrders.map((order) => {
                const badge = getStatusBadge(order.status);
                return (
                  <GlassInteractiveBox
                    key={order.id}
                    style={[styles.glassOrderCard, { borderRightWidth: 4, borderRightColor: '#F97316' }]}
                    glowColor="#F97316"
                  >
                    <View style={styles.orderTopRow}>
                      <View style={[styles.statusBadge, { backgroundColor: badge.bg, borderColor: badge.border }]}>
                        <Text style={[styles.statusBadgeText, { color: badge.color }]}>{badge.text}</Text>
                      </View>
                      <Text style={styles.neonEarnBadge}>+{order.fee} ₪</Text>
                    </View>

                    <View style={styles.darkRouteBox}>
                      <Text style={styles.darkRouteText}>🟢 استلام: {order.pickup}</Text>
                      <Text style={styles.darkRouteText}>🔴 تسليم: {order.dropoff}</Text>
                    </View>

                    <Text style={styles.darkOrderDetails}>📦 الطلب: {order.details}</Text>

                    {/* بيانات العميل وأزرار التواصل المباشر */}
                    <View style={styles.customerContactBar}>
                      <Text style={styles.neonPhoneText}>📞 العميل: {order.phone}</Text>
                      <View style={styles.contactButtonsGroup}>
                        <Pressable
                          style={styles.callActionBtn}
                          onPress={() => openPhoneCall(order.phone)}
                        >
                          <Text style={styles.contactBtnText}>📞 اتصال</Text>
                        </Pressable>
                        <Pressable
                          style={styles.whatsappActionBtn}
                          onPress={() => openWhatsApp(order.phone, order.order_code)}
                        >
                          <Text style={styles.contactBtnText}>💬 واتساب</Text>
                        </Pressable>
                      </View>
                    </View>

                    <View style={styles.driverActions}>
                      {order.status === 'pending' && (
                        <GlassInteractiveBox
                          style={[styles.neonActionBtn, { backgroundColor: '#10B981' }]}
                          onPress={() => updateOrderStatus(order.id, 'accepted')}
                          glowColor="#10B981"
                        >
                          <Text style={styles.neonBtnText}>قبول الطلب والانطلاق ✓</Text>
                        </GlassInteractiveBox>
                      )}

                      {order.status === 'accepted' && (
                        <GlassInteractiveBox
                          style={[styles.neonActionBtn, { backgroundColor: '#0284C7' }]}
                          onPress={() => updateOrderStatus(order.id, 'picked_up')}
                          glowColor="#38BDF8"
                        >
                          <Text style={styles.neonBtnText}>تأكيد استلام الطلب 📦</Text>
                        </GlassInteractiveBox>
                      )}

                      {order.status === 'picked_up' && (
                        <GlassInteractiveBox
                          style={[styles.neonActionBtn, { backgroundColor: '#F97316' }]}
                          onPress={() => updateOrderStatus(order.id, 'delivered')}
                          glowColor="#F97316"
                        >
                          <Text style={styles.neonBtnText}>تم التسليم واستلام الكاش 🎉</Text>
                        </GlassInteractiveBox>
                      )}
                    </View>
                  </GlassInteractiveBox>
                );
              })
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ==========================================
  // 3. الشاشة الرئيسية
  // ==========================================
  return (
    <SafeAreaView style={styles.darkScreenRoot}>
      <StatusBar barStyle="light-content" backgroundColor="#050814" />
      <CorporateLiveBackground />

      <ScrollView contentContainerStyle={styles.homeScrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.homeContainer}>
          <View style={styles.corporateHeader}>
            <View style={styles.corpBadge}>
              <View style={styles.corpBadgeDot} />
              <Text style={styles.corpBadgeText}>SWIFTDROP LOGISTICS • متصل بالخادم السحابي</Text>
            </View>

            <View style={styles.corpLogoRow}>
              <View style={styles.corpLogoBox}>
                <Text style={styles.corpLogoBolt}>⚡</Text>
              </View>
              <Text style={styles.corpBrandTitle}>SwiftDrop</Text>
            </View>

            <Text style={styles.corpSubtitle}>
              الحل اللوجستي المتكامل للتوصيل الفوري — سرعة فائقة، تتبع لحظي، وموثوقية عالية.
            </Text>
          </View>

          <ExecutiveVespaTrack />

          <Text style={styles.corpSectionHeading}>اختر بوابة الدخول للمتابعة</Text>

          <GlassInteractiveBox
            style={styles.glassRoleCard}
            onPress={() => setRole('customer')}
            glowColor="#38BDF8"
            hoverScale={1.02}
            hoverLift={-6}
          >
            <View style={styles.roleTopRow}>
              <View style={[styles.glassIconBox, { backgroundColor: 'rgba(56, 189, 248, 0.15)', borderColor: 'rgba(56, 189, 248, 0.4)' }]}>
                <Text style={{ fontSize: 26 }}>📦</Text>
              </View>
              <View style={[styles.glassRoleTag, { backgroundColor: 'rgba(56, 189, 248, 0.15)' }]}>
                <Text style={[styles.glassRoleTagText, { color: '#38BDF8' }]}>بوابة العملاء</Text>
              </View>
            </View>

            <Text style={styles.glassRoleTitle}>طلب توصيل فوري</Text>
            <Text style={styles.glassRoleDesc}>
              أرسل طرودك أو اطلب مشترياتك ليصلك أقرب كابتن من أسطولنا في دقائق معدودة.
            </Text>

            <View style={[styles.glassCtaBtn, { backgroundColor: '#0284C7' }]}>
              <Text style={styles.glassCtaText}>إنشاء طلب جديد ←</Text>
            </View>
          </GlassInteractiveBox>

          <GlassInteractiveBox
            style={styles.glassRoleCard}
            onPress={() => setRole('driver')}
            glowColor="#F97316"
            hoverScale={1.02}
            hoverLift={-6}
          >
            <View style={styles.roleTopRow}>
              <View style={[styles.glassIconBox, { backgroundColor: 'rgba(249, 115, 22, 0.15)', borderColor: 'rgba(249, 115, 22, 0.4)' }]}>
                <Text style={{ fontSize: 26 }}>⚡</Text>
              </View>
              <View style={[styles.glassRoleTag, { backgroundColor: 'rgba(249, 115, 22, 0.15)' }]}>
                <Text style={[styles.glassRoleTagText, { color: '#FB923C' }]}>بوابة الكباتن</Text>
              </View>
            </View>

            <Text style={styles.glassRoleTitle}>انضم ككابتن توصيل</Text>
            <Text style={styles.glassRoleDesc}>
              استقبل الطلبات القريبة من موقعك عبر الرادار المباشر وحقق دخلاً يومياً مميزاً.
            </Text>

            <View style={[styles.glassCtaBtn, { backgroundColor: '#EA580C' }]}>
              <Text style={styles.glassCtaText}>دخول غرفة العمليات ←</Text>
            </View>
          </GlassInteractiveBox>

          <View style={styles.corpFooter}>
            <Text style={styles.corpFooterText}>
              © 2026 SwiftDrop Technologies • مزامنة لحظية عبر السحابة
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  darkScreenRoot: { flex: 1, backgroundColor: '#050814', position: 'relative' },
  bgBaseLayer: { ...StyleSheet.absoluteFillObject, backgroundColor: '#050814' },
  glowOrbOrange: { position: 'absolute', top: -60, right: -80, width: 320, height: 320, borderRadius: 160, backgroundColor: 'rgba(249, 115, 22, 0.14)' },
  glowOrbBlue: { position: 'absolute', top: 240, left: -100, width: 340, height: 340, borderRadius: 170, backgroundColor: 'rgba(56, 189, 248, 0.12)' },
  radarCenterBox: { position: 'absolute', top: 140, alignSelf: 'center', width: 240, height: 240, alignItems: 'center', justifyContent: 'center' },
  radarRing: { position: 'absolute', width: 220, height: 220, borderRadius: 110, borderWidth: 1.5, borderColor: '#F97316' },
  gridOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'space-between', opacity: 0.08 },
  gridHorizontalLine: { width: '100%', height: 1, backgroundColor: '#38BDF8' },
  corporateSkylineFooter: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-around', paddingHorizontal: 6 },
  skyscraperTower: { flex: 1, marginHorizontal: 3, borderTopLeftRadius: 6, borderTopRightRadius: 6, borderTopWidth: 1, borderColor: 'rgba(56, 189, 248, 0.2)', alignItems: 'center', paddingTop: 8 },
  towerBeaconLight: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#F97316', marginBottom: 8 },
  towerGlassLine: { width: 2, height: '65%', backgroundColor: 'rgba(56, 189, 248, 0.15)' },
  homeScrollContent: { flexGrow: 1, alignItems: 'center', paddingVertical: Platform.OS === 'web' ? 36 : 24, paddingHorizontal: 18 },
  homeContainer: { width: '100%', maxWidth: 480 },
  corporateHeader: { alignItems: 'center', marginBottom: 24 },
  corpBadge: { flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: 'rgba(15, 23, 42, 0.85)', paddingVertical: 7, paddingHorizontal: 16, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(249, 115, 22, 0.45)', marginBottom: 16 },
  corpBadgeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#F97316', marginLeft: 8 },
  corpBadgeText: { color: '#FDBA74', fontSize: 12, fontWeight: '800', letterSpacing: 0.5 },
  corpLogoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  corpLogoBox: { width: 52, height: 52, borderRadius: 16, backgroundColor: '#F97316', alignItems: 'center', justifyContent: 'center', marginRight: 12, shadowColor: '#F97316', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.7, shadowRadius: 16 },
  corpLogoBolt: { fontSize: 28 },
  corpBrandTitle: { fontSize: 38, fontWeight: '900', color: '#FFFFFF', letterSpacing: 0.8 },
  corpSubtitle: { fontSize: 15, color: '#94A3B8', textAlign: 'center', lineHeight: 24, maxWidth: 400 },
  fleetTrackCard: { backgroundColor: 'rgba(15, 23, 42, 0.75)', borderRadius: 20, paddingTop: 12, paddingBottom: 0, marginBottom: 24, borderWidth: 1, borderColor: 'rgba(56, 189, 248, 0.25)', overflow: 'hidden' },
  fleetStatusHeader: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, marginBottom: 6 },
  fleetLabel: { fontSize: 11, fontWeight: '800', color: '#38BDF8', letterSpacing: 0.8 },
  activeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#10B981' },
  fleetRoadArea: { height: 76, justifyContent: 'flex-end', position: 'relative' },
  scooterRoot: { width: 100, height: 60, position: 'absolute', bottom: 8, left: 0 },
  headlightBeam: { position: 'absolute', right: -42, top: 8, width: 48, height: 24, backgroundColor: 'rgba(56, 189, 248, 0.25)', borderTopRightRadius: 20, borderBottomRightRadius: 20 },
  scooterUpper: { flexDirection: 'row', alignItems: 'flex-end', height: 28, paddingLeft: 6 },
  deliveryBox: { width: 26, height: 24, backgroundColor: '#F97316', borderRadius: 6, borderWidth: 1, borderColor: '#FED7AA', alignItems: 'center', justifyContent: 'center' },
  scooterSeat: { width: 26, height: 9, backgroundColor: '#334155', borderTopLeftRadius: 6, borderTopRightRadius: 6, marginLeft: 2 },
  handlebarStem: { width: 13, height: 26, backgroundColor: '#F97316', borderTopLeftRadius: 6, borderTopRightRadius: 8, marginLeft: 13, position: 'relative' },
  headlightBulb: { position: 'absolute', right: -3, top: 4, width: 6, height: 9, borderRadius: 4, backgroundColor: '#38BDF8' },
  scooterBodyChassis: { width: 84, height: 18, backgroundColor: '#F97316', borderRadius: 12, marginLeft: 8, justifyContent: 'center', paddingHorizontal: 12 },
  chassisStripe: { height: 3, backgroundColor: '#FFFFFF', borderRadius: 2, opacity: 0.9 },
  wheelsRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 12, marginTop: -7 },
  wheelOuter: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#050814', borderWidth: 2, borderColor: '#38BDF8', alignItems: 'center', justifyContent: 'center' },
  wheelInner: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#F97316' },
  neonRoadLine: { height: 3, width: '100%', backgroundColor: '#38BDF8', opacity: 0.6 },
  corpSectionHeading: { fontSize: 16, fontWeight: '800', color: '#E2E8F0', textAlign: 'right', marginBottom: 14 },
  glassRoleCard: { backgroundColor: 'rgba(15, 23, 42, 0.82)', borderRadius: 22, padding: 22, marginBottom: 18, borderWidth: 1.5, borderColor: 'rgba(148, 163, 184, 0.22)' },
  roleTopRow: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  glassIconBox: { width: 54, height: 54, borderRadius: 16, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  glassRoleTag: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 },
  glassRoleTagText: { fontSize: 13, fontWeight: '800' },
  glassRoleTitle: { fontSize: 22, fontWeight: '900', color: '#FFFFFF', textAlign: 'right', marginBottom: 8 },
  glassRoleDesc: { fontSize: 15, color: '#94A3B8', textAlign: 'right', lineHeight: 24, marginBottom: 18 },
  glassCtaBtn: { paddingVertical: 14, borderRadius: 14, alignItems: 'center' },
  glassCtaText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  corpFooter: { marginTop: 12, alignItems: 'center', paddingVertical: 12 },
  corpFooterText: { fontSize: 12, color: '#64748B', fontWeight: '600' },
  glassTopNav: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 16, backgroundColor: 'rgba(15, 23, 42, 0.9)', borderBottomWidth: 1, borderBottomColor: 'rgba(148, 163, 184, 0.15)' },
  navBackBtn: { width: 42, height: 42, borderRadius: 12, backgroundColor: 'rgba(30, 41, 59, 0.9)', borderWidth: 1, borderColor: 'rgba(148, 163, 184, 0.25)', alignItems: 'center', justifyContent: 'center' },
  navBackArrow: { fontSize: 22, fontWeight: 'bold', color: '#FFFFFF' },
  navHeaderTitle: { fontSize: 20, fontWeight: '800', color: '#FFFFFF' },
  innerScroll: { padding: 18, alignItems: 'center', paddingBottom: 44 },
  formWrapper: { width: '100%', maxWidth: 480 },
  glassFormCard: { backgroundColor: 'rgba(15, 23, 42, 0.85)', borderRadius: 22, padding: 22, borderWidth: 1.5, borderColor: 'rgba(56, 189, 248, 0.25)', marginBottom: 24 },
  glassCardTitle: { fontSize: 19, fontWeight: '800', color: '#FFFFFF', textAlign: 'right', marginBottom: 14 },
  darkInputLabel: { fontSize: 14, fontWeight: '700', color: '#CBD5E1', textAlign: 'right', marginBottom: 6, marginTop: 12 },
  darkInput: { backgroundColor: 'rgba(5, 8, 20, 0.85)', borderWidth: 1.5, borderColor: 'rgba(148, 163, 184, 0.25)', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 13, fontSize: 15, color: '#FFFFFF', textAlign: 'right' },
  textArea: { height: 80, textAlignVertical: 'top' },
  feeRow: { flexDirection: 'row-reverse', justifyContent: 'space-between', marginTop: 8, marginBottom: 22, gap: 10 },
  darkFeeChip: { paddingVertical: 12, borderRadius: 12, backgroundColor: 'rgba(30, 41, 59, 0.8)', alignItems: 'center', borderWidth: 1.5, borderColor: 'rgba(148, 163, 184, 0.2)' },
  darkFeeChipActive: { backgroundColor: 'rgba(56, 189, 248, 0.2)', borderColor: '#38BDF8' },
  darkFeeText: { fontSize: 16, fontWeight: '800', color: '#94A3B8' },
  darkFeeTextActive: { color: '#38BDF8' },
  neonBlueBtn: { backgroundColor: '#0284C7', paddingVertical: 16, borderRadius: 14, alignItems: 'center' },
  neonBtnText: { color: '#FFFFFF', fontSize: 17, fontWeight: '800' },
  darkSectionHeader: { fontSize: 18, fontWeight: '800', color: '#FFFFFF', textAlign: 'right', marginBottom: 14 },
  emptyText: { color: '#94A3B8', textAlign: 'center', fontSize: 15, marginTop: 20 },
  glassOrderCard: { backgroundColor: 'rgba(15, 23, 42, 0.85)', borderRadius: 18, padding: 18, marginBottom: 16, borderWidth: 1.5, borderColor: 'rgba(148, 163, 184, 0.2)' },
  orderTopRow: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, borderWidth: 1 },
  statusBadgeText: { fontSize: 13, fontWeight: '800' },
  orderIdText: { fontSize: 14, fontWeight: '800', color: '#94A3B8' },
  darkRouteBox: { backgroundColor: 'rgba(5, 8, 20, 0.75)', padding: 12, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(148, 163, 184, 0.15)' },
  darkRouteText: { fontSize: 15, fontWeight: '700', color: '#F8FAFC', textAlign: 'right', marginBottom: 6 },
  darkOrderDetails: { fontSize: 15, fontWeight: '600', color: '#FDE68A', textAlign: 'right', backgroundColor: 'rgba(245, 158, 11, 0.1)', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(245, 158, 11, 0.3)' },
  assignedDriverBox: { marginTop: 12, backgroundColor: 'rgba(56, 189, 248, 0.1)', borderWidth: 1, borderColor: 'rgba(56, 189, 248, 0.35)', borderRadius: 12, padding: 10, flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' },
  assignedDriverText: { color: '#7DD3FC', fontSize: 14, fontWeight: '800', flex: 1, textAlign: 'right' },
  contactMiniRow: { flexDirection: 'row-reverse', gap: 6 },
  miniCallBtn: { backgroundColor: '#0284C7', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  miniWaBtn: { backgroundColor: '#16A34A', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  miniContactText: { color: '#FFFFFF', fontSize: 12, fontWeight: '800' },
  cancelOrderBtn: { marginTop: 12, backgroundColor: 'rgba(239, 68, 68, 0.15)', borderWidth: 1, borderColor: '#EF4444', paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  cancelOrderText: { color: '#F87171', fontSize: 14, fontWeight: '800' },
  neonPhoneText: { fontSize: 15, fontWeight: '800', color: '#38BDF8', textAlign: 'right' },
  darkOrderFooter: { flexDirection: 'row-reverse', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: 'rgba(148, 163, 184, 0.15)', paddingTop: 12, marginTop: 12 },
  neonFeeText: { fontSize: 15, fontWeight: '800', color: '#34D399' },
  timeText: { fontSize: 13, fontWeight: '600', color: '#64748B' },
  liveCaptainPill: { flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1, borderColor: '#10B981', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 14 },
  liveCaptainDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#10B981', marginLeft: 6 },
  liveCaptainText: { fontSize: 13, fontWeight: '800', color: '#34D399' },
  earningsDashboardCard: { flexDirection: 'row-reverse', backgroundColor: 'rgba(15, 23, 42, 0.88)', borderRadius: 18, padding: 16, marginBottom: 16, borderWidth: 1.5, borderColor: 'rgba(249, 115, 22, 0.35)', alignItems: 'center' },
  statBox: { flex: 1, alignItems: 'center' },
  statDivider: { width: 1, height: 40, backgroundColor: 'rgba(148, 163, 184, 0.2)' },
  statLabel: { fontSize: 13, color: '#94A3B8', fontWeight: '700', marginBottom: 4 },
  statValueOrange: { fontSize: 22, fontWeight: '900', color: '#FB923C' },
  statValueGreen: { fontSize: 22, fontWeight: '900', color: '#34D399' },
  driverProfileCard: { backgroundColor: 'rgba(15, 23, 42, 0.85)', borderRadius: 18, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(148, 163, 184, 0.2)' },
  driverProfileTitle: { fontSize: 13, fontWeight: '800', color: '#FDBA74', textAlign: 'right', marginBottom: 10 },
  driverInputsRow: { flexDirection: 'row-reverse', gap: 10 },
  tabsRow: { flexDirection: 'row-reverse', gap: 10, marginBottom: 16 },
  tabBtn: { flex: 1, paddingVertical: 12, borderRadius: 12, backgroundColor: 'rgba(15, 23, 42, 0.75)', borderWidth: 1, borderColor: 'rgba(148, 163, 184, 0.2)', alignItems: 'center' },
  tabBtnActive: { backgroundColor: 'rgba(249, 115, 22, 0.2)', borderColor: '#F97316' },
  tabBtnText: { fontSize: 14, fontWeight: '800', color: '#94A3B8' },
  tabBtnTextActive: { color: '#FB923C' },
  customerContactBar: { marginTop: 12, flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(5, 8, 20, 0.6)', padding: 10, borderRadius: 12 },
  contactButtonsGroup: { flexDirection: 'row-reverse', gap: 8 },
  callActionBtn: { backgroundColor: '#0284C7', paddingHorizontal: 12, paddingVertical: 7, borderRadius: 8 },
  whatsappActionBtn: { backgroundColor: '#16A34A', paddingHorizontal: 12, paddingVertical: 7, borderRadius: 8 },
  contactBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '800' },
  neonEarnBadge: { fontSize: 16, fontWeight: '900', color: '#FB923C', backgroundColor: 'rgba(249, 115, 22, 0.15)', borderWidth: 1, borderColor: 'rgba(249, 115, 22, 0.4)', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 10 },
  driverActions: { marginTop: 14 },
  neonActionBtn: { paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
});