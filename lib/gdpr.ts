/**
 * GDPR Compliance Utilities
 *
 * This module provides utilities for GDPR compliance including:
 * - Data encryption
 * - User consent management
 * - Data deletion
 * - Data export
 * - Audit logging
 */

export interface UserConsent {
  userId: string
  consentType: 'analytics' | 'marketing' | 'functional' | 'all'
  granted: boolean
  timestamp: Date
  ipAddress: string
}

export interface DataExportRequest {
  userId: string
  requestedAt: Date
  data: {
    profile: any
    artworks: any[]
    analytics: any
    interactions: any[]
  }
}

export interface AuditLog {
  id: string
  userId: string
  action: 'view' | 'create' | 'update' | 'delete' | 'export' | 'consent'
  resource: string
  timestamp: Date
  ipAddress: string
  metadata?: any
}

/**
 * Check if user has given consent for a specific purpose
 */
export function hasConsent(
  userConsents: UserConsent[],
  consentType: UserConsent['consentType']
): boolean {
  const consent = userConsents.find((c) => c.consentType === consentType || c.consentType === 'all')
  return consent?.granted ?? false
}

/**
 * Encrypt sensitive user data
 */
export async function encryptData(data: string, key: string): Promise<string> {
  // In production, use proper encryption (AES-256, etc.)
  // This is a placeholder implementation
  if (typeof window !== 'undefined' && window.crypto) {
    const encoder = new TextEncoder()
    const dataBuffer = encoder.encode(data)
    const keyBuffer = encoder.encode(key)

    const cryptoKey = await window.crypto.subtle.importKey(
      'raw',
      keyBuffer,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt']
    )

    const iv = window.crypto.getRandomValues(new Uint8Array(12))
    const encryptedData = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      cryptoKey,
      dataBuffer
    )

    return btoa(String.fromCharCode(...new Uint8Array(encryptedData)))
  }

  // Fallback for server-side (use proper Node.js crypto)
  return Buffer.from(data).toString('base64')
}

/**
 * Decrypt sensitive user data
 */
export async function decryptData(encryptedData: string, key: string): Promise<string> {
  // In production, use proper decryption
  // This is a placeholder implementation
  if (typeof window !== 'undefined') {
    return atob(encryptedData)
  }

  return Buffer.from(encryptedData, 'base64').toString('utf-8')
}

/**
 * Anonymize user data for analytics
 */
export function anonymizeUserData(data: any): any {
  const anonymized = { ...data }

  // Remove personally identifiable information
  delete anonymized.email
  delete anonymized.name
  delete anonymized.phone
  delete anonymized.address
  delete anonymized.ipAddress

  // Hash user ID
  if (anonymized.userId) {
    anonymized.userId = hashString(anonymized.userId)
  }

  return anonymized
}

/**
 * Simple hash function (use crypto hash in production)
 */
function hashString(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return hash.toString(36)
}

/**
 * Export all user data (GDPR Right to Data Portability)
 */
export async function exportUserData(userId: string): Promise<DataExportRequest> {
  // In production, fetch all user data from database
  const exportRequest: DataExportRequest = {
    userId,
    requestedAt: new Date(),
    data: {
      profile: {
        // User profile data
      },
      artworks: [
        // User's uploaded artworks
      ],
      analytics: {
        // User's analytics data
      },
      interactions: [
        // User's interactions (likes, downloads, etc.)
      ],
    },
  }

  // Log the export request
  await logAudit({
    id: Date.now().toString(),
    userId,
    action: 'export',
    resource: 'user_data',
    timestamp: new Date(),
    ipAddress: 'system',
  })

  return exportRequest
}

/**
 * Delete all user data (GDPR Right to Erasure)
 */
export async function deleteUserData(userId: string): Promise<void> {
  // In production:
  // 1. Delete user profile
  // 2. Delete or anonymize user's artworks
  // 3. Delete user's analytics data
  // 4. Delete user's interactions
  // 5. Keep audit logs (legal requirement)

  // Log the deletion
  await logAudit({
    id: Date.now().toString(),
    userId,
    action: 'delete',
    resource: 'user_data',
    timestamp: new Date(),
    ipAddress: 'system',
    metadata: { reason: 'user_requested' },
  })
}

/**
 * Log audit trail for GDPR compliance
 */
export async function logAudit(log: AuditLog): Promise<void> {
  // In production, store in secure audit log database
  console.log('[AUDIT]', log)
}

/**
 * Check if data retention period has expired
 */
export function isDataRetentionExpired(
  createdAt: Date,
  retentionDays: number = 365
): boolean {
  const expirationDate = new Date(createdAt)
  expirationDate.setDate(expirationDate.getDate() + retentionDays)
  return new Date() > expirationDate
}

/**
 * Generate privacy policy consent text
 */
export function getConsentText(consentType: UserConsent['consentType']): string {
  const texts = {
    analytics: 'I consent to the collection and processing of my usage data for analytics purposes.',
    marketing: 'I consent to receive marketing communications and promotional materials.',
    functional: 'I consent to the use of cookies and similar technologies for functional purposes.',
    all: 'I consent to all data processing activities as described in the Privacy Policy.',
  }

  return texts[consentType]
}
