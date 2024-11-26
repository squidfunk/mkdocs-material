# RSA Key Size Requirement Analysis


**Target Infrastructure:** PwC Upload Storage (che.connect.pwc.com)  
**Current Status:** 2048-bit RSA  
**Industry Target:** 4096-bit RSA  
**Assessment Date:** November 1, 2024

## Current Implementation Status

### Present Configuration

```plaintext
Certificate Type: RSA
Current Key Size: 2048-bit
Implementation: GlobalSign Atlas R3 DV TLS CA 2024 Q3
Expiration: January 26, 2025
```

**Status: COMPLIANT (Current Standards)**
✓ Meets NIST SP 800-57 current requirements
✓ Compliant with Swiss regulatory framework
✓ Acceptable for current business use

## Regulatory Timeline

### Swiss/EU Requirements (Current)

```plaintext
Minimum Required: 2048-bit RSA
Recommended: 3072-bit or 4096-bit RSA
NIST Timeline: No mandatory upgrade before 2030
```

**Status: NOT CRITICAL**

- No immediate regulatory pressure
- Current implementation remains secure

### Industry Standards Evolution

```plaintext
BSI Technical Guideline (Germany):
- Current: 2048-bit minimum
- 2025-2030: 3072-bit recommended
- Post-2030: 4096-bit recommended

NIST Guidelines:
- Current: 2048-bit acceptable
- 2030+: 3072-bit minimum recommended
```

**Assessment: MONITORING REQUIRED**

## Security Impact Analysis

### Current Security Level

```plaintext
Computational Resistance: ~112-bit security level
Quantum Resistance: Not relevant for shorter timeframes
Industry Acceptance: Widely accepted
```

**Status: SECURE FOR CURRENT USE**

### Risk Assessment

1. **Current Implementation (2048-bit)**
   
   - Cryptographically secure
   - No known practical attacks
   - Industry standard compliance

2. **Future Considerations**
   
   - Quantum computing timeline: Not immediate concern
   - Processing overhead: Current implementation optimal
   - Forward security: Adequate for medium term

## Recommendation for Renata SA

### Immediate Action

```plaintext
Required Action: None
Monitoring: Yes
Risk Level: Low
```

**Decision: CONTINUE USING SERVICE**

### Rationale

1. PwC's current implementation is:
   
   - Compliant with all current standards
   - Secure for confidential data handling
   - Regularly audited and updated

2. No immediate security risk because:
   
   - 2048-bit RSA remains cryptographically secure
   - Implementation follows best practices
   - Regular security updates are maintained

### Future Planning

```plaintext
Timeline Considerations:
- 2024-2025: No action required
- 2025-2030: Monitor for updates
- Post-2030: Expect transition to stronger keys
```

**Planning Status: ADEQUATE**

## Conclusion

The current 2048-bit RSA implementation used by PwC is:

- ✓ Fully compliant with current regulations
- ✓ Secure for confidential data handling
- ✓ Regularly monitored and updated

While transition to 4096-bit RSA is part of future security evolution, it is:

- Not mandatory in current regulatory framework
- Not critical for current security requirements
- Part of normal security evolution cycle

# 