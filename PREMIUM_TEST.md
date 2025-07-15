# Area Premium - Test Implementation

Per testare l'area premium senza effettuare pagamenti reali, puoi utilizzare questi voucher di test:

## Voucher di Test Validi

### Formato: XXXX-XXXX-XXXX

- `TEST-PREM-2024` - Voucher di test permanente
- `DEMO-USER-TEST` - Voucher demo
- `FREE-TRIAL-24H` - Trial gratuito 24h

## Come testare

1. Vai su `/premium`
2. Clicca su "Hai già un codice di accesso?"
3. Inserisci uno dei voucher di test sopra
4. Il sistema ti dovrebbe garantire accesso per 24 ore

## API Endpoints

- `GET /api/v1/premium/videos` - Ottieni video premium
- `POST /api/v1/premium/create-voucher` - Crea voucher (post-pagamento)
- `POST /api/v1/premium/verify-voucher` - Verifica voucher

## Stripe Test

Per testare i pagamenti Stripe usa:
- Carta di test: `4242 4242 4242 4242`
- CVV: qualsiasi 3 cifre
- Data: qualsiasi data futura

## LocalStorage

Il sistema salva la sessione premium in:
- `fwall_premium_session` - Sessione attiva
- `fwall_used_vouchers` - Voucher già utilizzati
