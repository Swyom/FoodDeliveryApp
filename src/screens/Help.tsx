import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';

interface FaqItemProps {
  question: string;
  answer: string;
  colors: any;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer, colors }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity
      style={[styles.faqCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}
      activeOpacity={0.7}
      onPress={() => setExpanded(!expanded)}
    >
      <View style={styles.faqHeader}>
        <Text style={[styles.faqQuestion, { color: colors.text }]}>{question}</Text>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={18}
          color={colors.textSecondary}
        />
      </View>
      {expanded && (
        <Text style={[styles.faqAnswer, { color: colors.textSecondary }]}>{answer}</Text>
      )}
    </TouchableOpacity>
  );
};

const Help = () => {
  const { colors, theme } = useTheme();
  const navigation = useNavigation();

  const faqs = [
    {
      question: 'How do I track my active order?',
      answer: 'Once your order is successfully placed, it will be listed in the "Active Orders" panel inside the checkout tab. You can view progress, items list, and billing receipt there.',
    },
    {
      question: 'What is Spice Points program?',
      answer: 'Spice Points are loyalty credits you earn with each successful order. You can redeem these points during checkout on promotional cards for flat discounts!',
    },
    {
      question: 'Can I cancel an active order?',
      answer: 'Yes! Active orders can be cancelled instantly by clicking the "Cancel Order" button within the order preview card. Your refund gets processed immediately to your digital wallet.',
    },
    {
      question: 'How does GPS reverse geocoding work?',
      answer: 'When you tap "Refresh GPS" in the Checkout tab, Spice Delivery securely asks your mobile device for local coordinate permissions to automatically write your street name and region.',
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header bar */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Help & Support</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Help Banner card */}
        <View style={[styles.supportBanner, { backgroundColor: colors.primary }]}>
          <Ionicons name="chatbubbles" size={32} color="#fff" style={{ marginBottom: 8 }} />
          <Text style={styles.bannerTitle}>How can we help?</Text>
          <Text style={styles.bannerSubtitle}>Our support squad is here 24/7 to resolve issues instantly.</Text>
        </View>

        {/* FAQ Accordions Section */}
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Common Questions</Text>
        {faqs.map((faq, index) => (
          <FaqItem key={index} question={faq.question} answer={faq.answer} colors={colors} />
        ))}

        {/* Direct contact options */}
        <Text style={[styles.sectionTitle, { color: colors.textSecondary, marginTop: 14 }]}>Reach Out to Us</Text>
        <View style={styles.contactRow}>
          <TouchableOpacity style={[styles.contactCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
            <View style={[styles.contactIcon, { backgroundColor: theme === 'dark' ? '#1e3a2f' : '#e6f4ea' }]}>
              <Ionicons name="call" size={20} color="#10b981" />
            </View>
            <Text style={[styles.contactLabel, { color: colors.text }]}>Call Hotline</Text>
            <Text style={[styles.contactSub, { color: colors.textSecondary }]}>Instant response</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.contactCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
            <View style={[styles.contactIcon, { backgroundColor: theme === 'dark' ? '#2f1a12' : '#fff3ed' }]}>
              <Ionicons name="mail" size={20} color="#FF6B35" />
            </View>
            <Text style={[styles.contactLabel, { color: colors.text }]}>Email Support</Text>
            <Text style={[styles.contactSub, { color: colors.textSecondary }]}>Reply under 15m</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 44,
    paddingBottom: 14,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  scrollContainer: {
    padding: 20,
  },
  supportBanner: {
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 4,
  },
  bannerSubtitle: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 10,
    marginLeft: 4,
  },
  faqCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 10,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  faqQuestion: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    paddingRight: 10,
  },
  faqAnswer: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
    marginTop: 10,
  },
  contactRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 30,
  },
  contactCard: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    alignItems: 'center',
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  contactLabel: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },
  contactSub: {
    fontSize: 10,
    fontWeight: '500',
  },
});

export default Help;