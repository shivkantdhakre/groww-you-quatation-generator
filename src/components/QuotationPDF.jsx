import React from 'react';
import { Document, Page, View, Text, Image, Svg, Path, Circle, Rect, StyleSheet } from '@react-pdf/renderer';
import { formatCurrencyValue } from '../utils/helpers';
import signatureImg from '../assets/signature.png';

const styles = StyleSheet.create({
  page: {
    paddingTop: 135,
    paddingBottom: 115,
    paddingHorizontal: 50,
    fontFamily: 'Helvetica',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff'
  },
  topWave: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 260,
    height: 104
  },
  bottomWave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: 595.28,
    height: 134
  },
  watermark: {
    position: 'absolute',
    top: '38%',
    left: '12%',
    opacity: 0.035,
    fontSize: 66,
    fontWeight: 'bold',
    transform: 'rotate(-32deg)',
    color: '#0B2E59',
    zIndex: -1
  },
  header: {
    position: 'absolute',
    top: 40,
    left: 50,
    right: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1.5,
    borderBottomColor: '#0B2E59',
    paddingBottom: 8,
    zIndex: 100
  },
  logo: {
    width: 220,
    height: 68,
    objectFit: 'contain'
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0B2E59'
  },
  headerContact: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    fontSize: 8,
    color: '#0B2E59',
    gap: 3.5,
    marginTop: 8,
    marginRight: 45
  },
  contactRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  titleBar: {
    textAlign: 'center',
    marginVertical: 10
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0B2E59',
    textDecoration: 'underline'
  },
  subtitle: {
    fontSize: 9.5,
    color: '#0B2E59',
    marginTop: 6,
    fontWeight: 'bold'
  },
  introText: {
    fontSize: 9,
    color: '#0B2E59',
    lineHeight: 1.35,
    marginVertical: 6
  },
  divider: {
    height: 1.5,
    backgroundColor: '#0B2E59',
    marginVertical: 6
  },
  // Page 1 Metadata list
  metadataBlock: {
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 12,
    fontSize: 9.5,
    lineHeight: 1.45,
    color: '#0B2E59'
  },
  metadataRow: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 3
  },
  metadataColLabel: {
    width: 130,
    fontWeight: 'bold'
  },
  metadataColValue: {
    flex: 1
  },
  clientDescription: {
    fontSize: 9,
    color: '#0B2E59',
    lineHeight: 1.35,
    marginVertical: 8
  },
  sectionTitle: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#0B2E59',
    marginTop: 12,
    marginBottom: 6
  },
  platformsText: {
    fontSize: 9,
    color: '#0B2E59',
    paddingLeft: 12,
    marginBottom: 8
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    paddingLeft: 12
  },
  listItemRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    fontSize: 9,
    color: '#0B2E59'
  },
  listDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#0B2E59'
  },
  // Page 2 specific
  pricingTitle: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#0B2E59',
    marginTop: 12,
    marginBottom: 5
  },
  pricingValue: {
    fontSize: 9,
    color: '#0B2E59',
    fontWeight: 'bold',
    marginBottom: 12
  },
  paymentTitleRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#0B2E59',
    marginTop: 10,
    marginBottom: 8
  },
  regardsSection: {
    marginTop: 'auto',
    marginBottom: 10,
    alignSelf: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    gap: 2
  },
  regardsText: {
    fontSize: 9,
    color: '#0B2E59',
    lineHeight: 1.3
  },
  regardsName: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#0B2E59'
  },
  signatureImg: {
    width: 100,
    height: 45,
    objectFit: 'contain',
    marginTop: 4,
    marginBottom: 1
  },
  signatureLine: {
    width: 160,
    height: 1.5,
    backgroundColor: '#0B2E59',
    marginTop: 2
  }
});

// Globe SVG icon component
const GlobeIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24" fill="#FFFFFF" stroke="#F5A623" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="10" />
    <Path d="M2 12h20" />
    <Path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </Svg>
);

// Mail SVG icon component
const MailIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24" fill="#FFFFFF" stroke="#F5A623" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <Path d="M22 6l-10 7L2 6" />
  </Svg>
);

// CreditCard SVG icon component
const CreditCardIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0B2E59" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <Rect x="2" y="5" width="20" height="14" rx="2" ry="2" />
    <Path d="M2 10h20" />
  </Svg>
);

export default function QuotationPDF({ data }) {
  const baseCost = Number(data.pricing?.totalAmount) || 0;
  const taxRate = Number(data.pricing?.taxPercentage) || 0;
  const computedGrandTotal = baseCost + (baseCost * (taxRate / 100));
  const currency = data.meta?.currency || 'INR';

  return (
    <Document>
      {/* PAGE 1 */}
      <Page size="A4" style={styles.page}>
        {/* Background Waves */}
        <Svg viewBox="0 0 500 200" style={styles.topWave}>
          <Path d="M 180 0 C 300 120, 400 90, 500 160 L 500 0 Z" fill="#F5A623" />
          <Path d="M 220 0 C 330 100, 420 70, 500 130 L 500 0 Z" fill="#0B2E59" />
        </Svg>

        <Svg viewBox="0 0 800 180" style={styles.bottomWave}>
          <Path d="M 0 180 L 0 110 C 150 70, 300 170, 500 130 C 650 90, 720 100, 800 60 L 800 180 Z" fill="#F5A623" />
          <Path d="M 0 180 L 0 180 C 150 180, 300 180, 500 160 C 650 130, 720 130, 800 90 L 800 180 Z" fill="#0B2E59" />
        </Svg>

        {/* Watermark */}
        <Text style={styles.watermark}>GROWW YOU</Text>

        {/* Header Block */}
        <View style={styles.header}>
          <View>
            {data.company?.logo ? (
              <Image src={data.company.logo} style={styles.logo} />
            ) : (
              <Text style={styles.logoText}>GROWW YOU</Text>
            )}
          </View>
          <View style={styles.headerContact}>
            <View style={styles.contactRow}>
              <Text style={{ textDecoration: 'underline' }}>{data.company?.website || 'www.growwyou.com'}</Text>
              <GlobeIcon />
            </View>
            <View style={styles.contactRow}>
              <Text style={{ textDecoration: 'underline' }}>{data.company?.email || 'info@growwyou.com'}</Text>
              <MailIcon />
            </View>
            <Text style={{ color: '#0B2E59' }}>{data.company?.phone || '+91 7351700020'}</Text>
          </View>
        </View>

        {/* Document Content */}
        <View style={styles.titleBar}>
          <Text style={styles.title}>{data.meta?.subject || 'SERVICE QUOTATION'}</Text>
          <Text style={styles.subtitle}>Company Name : {data.meta?.companySubtitle || 'Groww You - Software Development & Marketing'}</Text>
        </View>

        <Text style={styles.introText}>{data.meta?.introText || 'As per our discussion...'}</Text>
        <View style={styles.divider} />

        {/* Metadata List */}
        <View style={styles.metadataBlock}>
          <View style={styles.metadataRow}>
            <Text style={styles.metadataColLabel}>Quotation No:</Text>
            <Text style={styles.metadataColValue}>{data.meta?.quoteNumber}</Text>
          </View>
          <View style={styles.metadataRow}>
            <Text style={styles.metadataColLabel}>Date:</Text>
            <Text style={styles.metadataColValue}>{data.meta?.date}</Text>
          </View>
          <View style={styles.metadataRow}>
            <Text style={styles.metadataColLabel}>Client Name:</Text>
            <Text style={styles.metadataColValue}>{data.client?.name || '---'}</Text>
          </View>
          <View style={styles.metadataRow}>
            <Text style={styles.metadataColLabel}>Phone:</Text>
            <Text style={styles.metadataColValue}>{data.client?.phone || '---'}</Text>
          </View>
          <View style={styles.metadataRow}>
            <Text style={styles.metadataColLabel}>Email:</Text>
            <Text style={styles.metadataColValue}>{data.client?.email || '---'}</Text>
          </View>
          <View style={styles.metadataRow}>
            <Text style={styles.metadataColLabel}>Service Package:</Text>
            <Text style={styles.metadataColValue}>{data.client?.package || '---'}</Text>
          </View>
          <View style={styles.metadataRow}>
            <Text style={styles.metadataColLabel}>Issued By:</Text>
            <Text style={styles.metadataColValue}>{data.meta?.issuedBy || 'Groww You'}</Text>
          </View>
        </View>

        {/* Client description paragraph */}
        {data.client?.description && (
          <Text style={styles.clientDescription}>{data.client.description}</Text>
        )}

        {/* Platforms Covered */}
        <Text style={styles.sectionTitle}>Platforms Covered:</Text>
        <Text style={styles.platformsText}>{data.page1?.platformsCovered || '1. Instagram & Facebook Ads'}</Text>

        {/* Services Included */}
        {data.project?.items && data.project.items.filter(item => item.name).length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Services Included:</Text>
            <View style={styles.listContainer}>
              {data.project.items.filter(item => item.name).map((item, idx) => (
                <View key={idx} style={styles.listItemRow}>
                  <View style={styles.listDot} />
                  <Text>{item.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </Page>

      {/* PAGE 2 */}
      <Page size="A4" style={styles.page}>
        {/* Background Waves */}
        <Svg viewBox="0 0 500 200" style={styles.topWave}>
          <Path d="M 180 0 C 300 120, 400 90, 500 160 L 500 0 Z" fill="#F5A623" />
          <Path d="M 220 0 C 330 100, 420 70, 500 130 L 500 0 Z" fill="#0B2E59" />
        </Svg>

        <Svg viewBox="0 0 800 180" style={styles.bottomWave}>
          <Path d="M 0 180 L 0 110 C 150 70, 300 170, 500 130 C 650 90, 720 100, 800 60 L 800 180 Z" fill="#F5A623" />
          <Path d="M 0 180 L 0 180 C 150 180, 300 180, 500 160 C 650 130, 720 130, 800 90 L 800 180 Z" fill="#0B2E59" />
        </Svg>

        {/* Watermark */}
        <Text style={styles.watermark}>GROWW YOU</Text>

        {/* Header Block */}
        <View style={styles.header}>
          <View>
            {data.company?.logo ? (
              <Image src={data.company.logo} style={styles.logo} />
            ) : (
              <Text style={styles.logoText}>GROWW YOU</Text>
            )}
          </View>
          <View style={styles.headerContact}>
            <View style={styles.contactRow}>
              <Text style={{ textDecoration: 'underline' }}>{data.company?.website || 'www.growwyou.com'}</Text>
              <GlobeIcon />
            </View>
            <View style={styles.contactRow}>
              <Text style={{ textDecoration: 'underline' }}>{data.company?.email || 'info@growwyou.com'}</Text>
              <MailIcon />
            </View>
            <Text style={{ color: '#0B2E59' }}>{data.company?.phone || '+91 7351700020'}</Text>
          </View>
        </View>

        {/* Document Content */}
        <View style={styles.titleBar}>
          <Text style={styles.title}>{data.meta?.subject || 'SERVICE QUOTATION'}</Text>
          <Text style={styles.subtitle}>Company Name : {data.meta?.companySubtitle || 'Groww You - Software Development & Marketing'}</Text>
        </View>

        <Text style={styles.introText}>{data.meta?.introText || 'As per our discussion...'}</Text>
        <View style={styles.divider} />

        {/* Total Quotation */}
        <Text style={styles.pricingTitle}>Total Quotation :</Text>
        <Text style={styles.pricingValue}>
          Total Service Cost: {formatCurrencyValue(computedGrandTotal, currency)} {data.meta?.priceUnit || ''}
        </Text>

        {/* Payment Terms */}
        <View style={styles.paymentTitleRow}>
          <CreditCardIcon />
          <Text>Payment Terms :</Text>
        </View>

        {data.terms && data.terms.filter(t => t.milestone).length > 0 && (
          <View style={styles.listContainer}>
            {data.terms.filter(t => t.milestone).map((term, idx) => (
              <View key={idx} style={styles.listItemRow}>
                <View style={styles.listDot} />
                <Text>
                  {term.milestone} {term.percentage > 0 ? `(${term.percentage}%)` : ''}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Regards and Signature Block */}
        <View style={styles.regardsSection}>
          <Text style={styles.regardsText}>Regards,</Text>
          <Text style={styles.regardsName}>{data.meta?.regardsName || 'Amit Bhardwaj'}</Text>
          <Text style={styles.regardsText}>
            {data.meta?.regardsTitle || 'Director, Groww You'}, {data.meta?.regardsCompany || 'Groww You'}
          </Text>
          <Image src={signatureImg} style={styles.signatureImg} />
          <View style={styles.signatureLine} />
        </View>
      </Page>
    </Document>
  );
}
