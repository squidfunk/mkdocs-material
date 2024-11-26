# Caddy Documentation

* Source: <https://caddyserver.com/docs/caddyfile/directives/tls#tailscale>

# tls[🔗](https://caddyserver.com/docs/caddyfile/directives/tls#tls "Direct link")

Configures TLS for the site.

**Caddy's default TLS settings are secure. Only change these settings if you have a good reason and understand the implications.** The most common use of this directive will be to specify an ACME account email address, change the ACME CA endpoint, or to provide your own certificates.

Compatibility note: Due to its sensitive nature as a security protocol, deliberate adjustments to TLS defaults may be made in new minor or patch releases. Old or broken TLS versions, ciphers, features, etc. may be removed at any time. If your deployment is extremely sensitive to changes, you should explicitly specify those values which must remain constant, and be vigilant about upgrades. In almost every case, we recommend using the default settings.

## Syntax[🔗](https://caddyserver.com/docs/caddyfile/directives/tls#syntax "Direct link")

```
tls [internal|<email>] | [<cert_file> <key_file>] {
	protocols <min> [<max>]
	ciphers   <cipher_suites...>
	curves    <curves...>
	alpn      <values...>
	load      <paths...>
	ca        <ca_dir_url>
	ca_root   <pem_file>
	key_type  ed25519|p256|p384|rsa2048|rsa4096
	dns       <provider_name> [<params...>]
	propagation_timeout <duration>
	propagation_delay   <duration>
	dns_ttl             <duration>
	dns_challenge_override_domain <domain>
	resolvers <dns_servers...>
	eab       <key_id> <mac_key>
	on_demand
	reuse_private_keys
	client_auth {
		mode                   [request|require|verify_if_given|require_and_verify]
		trust_pool             <module>
		verifier 			   <module>
	}
	issuer          <issuer_name>  [<params...>]
	get_certificate <manager_name> [<params...>]
	insecure_secrets_log <log_file>
}
```

* **internal** means to use Caddy's internal, locally-trusted CA to produce certificates for this site. To further configure the [`internal`](https://caddyserver.com/docs/caddyfile/directives/tls#internal) issuer, use the [`issuer`](https://caddyserver.com/docs/caddyfile/directives/tls#issuer) subdirective.
* **\<email>** is the email address to use for the ACME account managing the site's certificates. You may prefer to use the [`email` global option](https://caddyserver.com/docs/caddyfile/options#email) instead, to configure this for all your sites at once.

Keep in mind that Let's Encrypt may send you emails about your certificate nearing expiry, but this may be misleading because Caddy may have chosen to use a different issuer (e.g. ZeroSSL) when renewing. Check your logs and/or the certificate itself (in your browser for example) to see which issuer was used, and that its expiry is still valid; if so, you may safely ignore the email from Let's Encrypt.

* **\<cert_file>** and **\<key_file>** are the paths to the certificate and private key PEM files. Specifying just one is invalid.

* **protocols** specifies the minimum and maximum protocol versions. DO NOT change these unless you know what you're doing. Configuring this is rarely necessary, because Caddy will always use modern defaults.

  Default min: `tls1.2`, Default max: `tls1.3`

* **ciphers** specifies the list of cipher suite names in descending preference order. DO NOT change these unless you know what you're doing. Note that cipher suites are not customizable for TLS 1.3; and not all TLS 1.2 ciphers are enabled by default. The supported names are (in order of preference by the Go stdlib):

  * `TLS_AES_128_GCM_SHA256`
  * `TLS_CHACHA20_POLY1305_SHA256`
  * `TLS_AES_256_GCM_SHA384`
  * `TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256`
  * `TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256`
  * `TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384`
  * `TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384`
  * `TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256`
  * `TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256`
  * `TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA`
  * `TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA`
  * `TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA`
  * `TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA`
  * `TLS_ECDHE_RSA_WITH_3DES_EDE_CBC_SHA`

* **curves** specifies the list of EC curves to support. It is recommended to not change these. Supported values are:

  * `x25519`
  * `secp256r1`
  * `secp384r1`
  * `secp521r1`

* **alpn** is the list of values to advertise in the [ALPN extension ![](https://caddyserver.com/old/resources/images/external-link.svg)](https://developer.mozilla.org/en-US/docs/Glossary/ALPN) of the TLS handshake.

* **load** specifies a list of folders from which to load PEM files that are certificate+key bundles.

* **ca** changes the ACME CA endpoint. This is most often used to set [Let's Encrypt's staging endpoint ![](https://caddyserver.com/old/resources/images/external-link.svg)](https://letsencrypt.org/docs/staging-environment/) when testing, or an internal ACME server. (To change this value for the whole Caddyfile, use the `acme_ca` [global option](https://caddyserver.com/docs/caddyfile/options) instead.)

* **ca_root** specifies a PEM file that contains a trusted root certificate for the ACME CA endpoint, if not in the system trust store.

* **key_type** is the type of key to use when generating CSRs. Only set this if you have a specific requirement.

* **dns** enables the [DNS challenge](https://caddyserver.com/docs/automatic-https#dns-challenge) using the specified provider plugin, which must be plugged in from one of the [`caddy-dns` ![](https://caddyserver.com/old/resources/images/external-link.svg)](https://github.com/caddy-dns) repositories. Each provider plugin may have their own syntax following their name; refer to their docs for details. Maintaining support for each DNS provider is a community effort. [Learn how to enable the DNS challenge for your provider at our wiki.](https://caddy.community/t/how-to-use-dns-provider-modules-in-caddy-2/8148)

* **propagation_timeout** is a [duration value](https://caddyserver.com/docs/conventions#durations) that sets the maximum time to wait for the DNS TXT records to appear when using the DNS challenge. Set to `-1` to disable propagation checks. Default 2 minutes.

* **propagation_delay** is a [duration value](https://caddyserver.com/docs/conventions#durations) that sets how long to wait before starting DNS TXT records propagation checks when using the DNS challenge. Default `0` (no wait).

* **dns_ttl** is a [duration value](https://caddyserver.com/docs/conventions#durations) that sets the TTL of the `TXT` record used for the DNS challenge. Rarely needed.

* **dns_challenge_override_domain** overrides the domain to use for the DNS challenge. This is to delegate the challenge to a different domain.

  You may want to use this if your primary domain's DNS provider does not have a [DNS plugin ![](https://caddyserver.com/old/resources/images/external-link.svg)](https://github.com/caddy-dns) available. You can instead add a `CNAME` record with subdomain `_acme-challenge` to your primary domain, pointing to a secondary domain for which you *do* have a plugin. This option *does not* require special support from the plugin.

  When ACME issuers try to solve the DNS challenge for your primary domain, they will then follow the `CNAME` to your secondary domain to find the `TXT` record.

  **Note:** Use full canonical name from the CNAME record as value here - `_acme-challenge` subdomain won't be prepended automatically.

* **resolvers** customizes the DNS resolvers used when performing the DNS challenge; these take precedence over system resolvers or any default ones. If set here, the resolvers will propagate to all configured certificate issuers.

  This is typically a list of IP addresses. For example, to use [Google Public DNS ![](https://caddyserver.com/old/resources/images/external-link.svg)](https://developers.google.com/speed/public-dns):

  ```
  resolvers 8.8.8.8 8.8.4.4
  ```

* **eab** configures ACME external account binding (EAB) for this site, using the key ID and MAC key provided by your CA.

* **on_demand** enables [On-Demand TLS](https://caddyserver.com/docs/automatic-https#on-demand-tls) for the hostnames given in the site block's address(es). **Security warning:** Doing so in production is insecure unless you also configure the [`on_demand_tls` global option](https://caddyserver.com/docs/caddyfile/options#on-demand-tls) to mitigate abuse.

* **reuse_private_keys** enables reuse of private keys when renewing certificates. By default, a new key is created for every new certificate to mitigate pinning and reduce the scope of key compromise. Key pinning is against industry best practices. This option is not recommended unless you have a specific reason to use it; this may be subject to removal in a future version.

* **client_auth** enables and configures TLS client authentication:

  * **mode** is the mode for authenticating the client. Allowed values are:

    | Mode               | Description                                                                             |
    | ------------------ | --------------------------------------------------------------------------------------- |
    | request            | Ask clients for a certificate, but allow even if there isn't one; do not verify it      |
    | require            | Require clients to present a certificate, but do not verify it                          |
    | verify_if_given    | Ask clients for a certificate; allow even if there isn't one, but verify it if there is |
    | require_and_verify | Require clients to present a valid certificate that is verified                         |

    Default: `require_and_verify` if `trust_pool` module is provided; otherwise, `require`.

  * **trust_pool** configures the source of certificate authorities (CA) providing certificates against which to validate client certificates.

    The certificate authority used providing the pool of trusted certificates and the configuration within the segment depends on the configured source of trust pool module. The standard modules available in Caddy are [listed below](https://caddyserver.com/docs/caddyfile/directives/tls#trust-pool-providers). The full list of modules, including 3rd-party, is listed in the [`trust_pool` JSON documentation](https://caddyserver.com/docs/json/apps/http/servers/tls_connection_policies/client_authentication/#trust_pool).

    Multiple `trusted_*` directives may be used to specify multiple CA or leaf certificates. Client certificates which are not listed as one of the leaf certificates or signed by any of the specified CAs will be rejected according to the **mode**.

  * **verifier** enables the use of a custom client certificate verifier module. These can perform custom client authentication checks, such as ensuring the certificate is not revoked.

* **issuer** configures a custom certificate issuer, or a source from which to obtain certificates.

  Which issuer is used and the options that follow in this segment depend on the [issuer modules](https://caddyserver.com/docs/caddyfile/directives/tls#issuers) that are available. Some of the other subdirectives such as `ca` and `dns` are actually shortcuts for configuring the `acme` issuer (and this subdirective was added later), so specifying this directive and some of the others is confusing and thus prohibited.

  This subdirective can be specified multiple times to configure multiple, redundant issuers; if one fails to issue a cert, the next one will be tried.

* **get_certificate** enables getting certificates from a [manager module](https://caddyserver.com/docs/caddyfile/directives/tls#certificate-managers) at handshake-time.

* **insecure_secrets_log** enables logging of TLS secrets to a file. This is also known as `SSLKEYLOGFILE`. Uses NSS key log format, which can then be parsed by Wireshark or other tools. ⚠️ **Security Warning:** This is insecure as it allows other programs or tools to decrypt TLS connections, and therefore completely compromises security. However, this capability can be useful for debugging and troubleshooting.

### Trust Pool Providers[🔗](https://caddyserver.com/docs/caddyfile/directives/tls#trust-pool-providers "Direct link")

These are the standard trust pool providers that can be used in the `trust_pool` subdirective:

#### inline[🔗](https://caddyserver.com/docs/caddyfile/directives/tls#inline "Direct link")

The `inline` module parses the trusted root certificates as listed in the Caddyfile directly in base64 DER-encoded format. The `trust_der` directive may be repeated multiple times.

```
trust_pool inline {
	trust_der      <base64_der>
}
```

* **trust_der** is a base64 DER-encoded CA certificate against which to validate client certificates.

#### file[🔗](https://caddyserver.com/docs/caddyfile/directives/tls#file "Direct link")

The `file` module reads the trusted root certificates from PEM files from disk. The `pem_file` directive can accept multiple file paths on the same line and may be repeated multiple times.

```
... file [<pem_file>...] {
	pem_file <pem_file>...
}
```

* **pem_file** is a path to a PEM CA certificate file against which to validate client certificates.

#### pki_root[🔗](https://caddyserver.com/docs/caddyfile/directives/tls#pki-root "Direct link")

The `pki_root` module obtains the *root* and trusts certificates from the certificate authority defined in the [PKI app](https://caddyserver.com/docs/caddyfile/options#pki-options). The `authority` directive can accept multiple authorities at the same time and may be repeated multiple times.

```
... pki_root [<ca_name>...] {
	authority <ca_name>...
}
```

* **authority** is the name of the certificate authority configured in the PKI app.

#### pki_intermediate[🔗](https://caddyserver.com/docs/caddyfile/directives/tls#pki-intermediate "Direct link")

The `pki_intermediate` module obtains the *intermediate* and trusts certificates from the certificate authority defined in the [PKI app](https://caddyserver.com/docs/caddyfile/options#pki-options). The `authority` directive can accept multiple authorities at the same time and may be repeated multiple times.

```
... pki_intermediate [<ca_name>...] {
	authority <ca_name>...
}
```

* **authority** is the name of the certificate authority configured in the PKI app.

#### storage[🔗](https://caddyserver.com/docs/caddyfile/directives/tls#storage "Direct link")

The `storage` module extracts the trusted certificates root from Caddy [storage](https://caddyserver.com/docs/caddyfile/options#storage). The `authority` directive can accept multiple authorities at the same time and may be repeated multiple times.

```
... storage [<storage_keys>...] {
	storage <storage_module>
	keys    <storage_keys>...
}
```

* **storage** is an optional storage module to use. If not specified, the default storage module will be used. If specified, it may be specified only once.
* **keys** is the list of storage keys at which the PEM files of the certificates are stored. The directive accepts multiple values on the same line and may be specified multiple times.

#### http[🔗](https://caddyserver.com/docs/caddyfile/directives/tls#http "Direct link")

The `http` module obtains the trusted certificates from HTTP endpoints. The `endpoints` directive can accept multiple endpoints at the same time and may be repeated multiple times.

```
... http [<endpoints...>] {
	endpoints   <endpoints...>
	tls         <tls_config>
}
```

* **endpoints** is the list of HTTP endpoints from which to obtain certificates. The directive accepts multiple values on the same line and may be specified multiple times.
* **tls** is an optional TLS configuration to use when connecting to the HTTP endpoint. The segment parsing is defined in the [following section](https://caddyserver.com/docs/caddyfile/directives/tls#tls-1).

##### TLS[🔗](https://caddyserver.com/docs/caddyfile/directives/tls#tls-1 "Direct link")

```
... {
	ca                    <ca_module>
	insecure_skip_verify
	handshake_timeout     <duration>
	server_name           <name>
	renegotiation         <never|once|freely>
}
```

* **ca** is an optional directive to define the provider of trust pool. The configuration follows the same behavior of [`trust_pool`](https://caddyserver.com/docs/caddyfile/directives/tls#trust_pool). If specified, it may be specified only once.

* **insecure_skip_verify** turns off TLS handshake verification, making the connection insecure and vulnerable to man-in-the-middle attacks. *Do not use in production.* The verification is done against either the certificate authorities trusted by the system or as determined by the [`ca`](https://caddyserver.com/docs/caddyfile/directives/tls#ca) directive.

* **handshake_timeout** is the maximum [duration](https://caddyserver.com/docs/conventions#durations) to wait for the TLS handshake to complete. Default: No timeout..

* **server_name** sets the server name used when verifying the certificate received in the TLS handshake. By default, this will use the upstream address' host part.

* **renegotiation** sets the TLS renegotiation level. TLS renegotiation is the act of performing subsequent handshakes after the first. The level may be one of:

  * `never` (the default) disables renegotiation.
  * `once` allows a remote server to request renegotiation once per connection.
  * `freely` allows a remote server to repeatedly request renegotiation.

### Issuers[🔗](https://caddyserver.com/docs/caddyfile/directives/tls#issuers "Direct link")

These issuers come standard with the `tls` directive:

#### acme[🔗](https://caddyserver.com/docs/caddyfile/directives/tls#acme "Direct link")

Obtains certificates using the ACME protocol. Note that `acme` is a default issuer (using Let's Encrypt), so configuring it explicitly is usually unnecessary.

```
... acme [<directory_url>] {
	dir      <directory_url>
	test_dir <test_directory_url>
	email    <email>
	timeout  <duration>
	disable_http_challenge
	disable_tlsalpn_challenge
	alt_http_port    <port>
	alt_tlsalpn_port <port>
	eab <key_id> <mac_key>
	trusted_roots <pem_files...>
	dns <provider_name> [<options>]
	propagation_timeout <duration>
	propagation_delay   <duration>
	dns_ttl             <duration>
	dns_challenge_override_domain <domain>
	resolvers <dns_servers...>
	preferred_chains [smallest] {
		root_common_name <common_names...>
		any_common_name  <common_names...>
	}
}
```

* **dir** is the URL to the ACME CA's directory.

  Default: `https://acme-v02.api.letsencrypt.org/directory`

* **test_dir** is an optional fallback directory to use when retrying challenges; if all challenges fail, this endpoint will be used during retries; useful if a CA has a staging endpoint where you want to avoid rate limits on their production endpoint.

  Default: `https://acme-staging-v02.api.letsencrypt.org/directory`

* **email** is the ACME account contact email address.

* **timeout** is a [duration value](https://caddyserver.com/docs/conventions#durations) that sets how long to wait before timing out an ACME operation.

* **disable_http_challenge** will disable the HTTP challenge.

* **disable_tlsalpn_challenge** will disable the TLS-ALPN challenge.

* **alt_http_port** is an alternate port on which to serve the HTTP challenge; it has to happen on port 80 so you must forward packets to this alternate port.

* **alt_tlsalpn_port** is an alternate port on which to serve the TLS-ALPN challenge; it has to happen on port 443 so you must forward packets to this alternate port.

* **eab** specifies an External Account Binding which may be required with some ACME CAs.

* **trusted_roots** is one or more root certificates (as PEM filenames) to trust when connecting to the ACME CA server.

* **dns** configures the DNS challenge.

* **propagation_timeout** is a [duration value](https://caddyserver.com/docs/conventions#durations) that sets the maximum time to wait for the DNS TXT records to appear when using the DNS challenge. Set to `-1` to disable propagation checks. Default 2 minutes.

* **propagation_delay** is a [duration value](https://caddyserver.com/docs/conventions#durations) that sets how long to wait before starting DNS TXT records propagation checks when using the DNS challenge. Default 0 (no wait).

* **dns_ttl** is a [duration value](https://caddyserver.com/docs/conventions#durations) that sets the TTL of the `TXT` record used for the DNS challenge. Rarely needed.

* **dns_challenge_override_domain** overrides the domain to use for the DNS challenge. This is to delegate the challenge to a different domain.

  You may want to use this if your primary domain's DNS provider does not have a [DNS plugin ![](https://caddyserver.com/old/resources/images/external-link.svg)](https://github.com/caddy-dns) available. You can instead add a `CNAME` record with subdomain `_acme-challenge` to your primary domain, pointing to a secondary domain for which you *do* have a plugin. This option *does not* require special support from the plugin.

  When ACME issuers try to solve the DNS challenge for your primary domain, they will then follow the `CNAME` to your secondary domain to find the `TXT` record.

  **Note:** Use full canonical name from the CNAME record as value here - `_acme-challenge` subdomain won't be prepended automatically.

* **resolvers** customizes the DNS resolvers used when performing the DNS challenge; these take precedence over system resolvers or any default ones. If set here, the resolvers will propagate to all configured certificate issuers.

  This is typically a list of IP addresses. For example, to use [Google Public DNS ![](https://caddyserver.com/old/resources/images/external-link.svg)](https://developers.google.com/speed/public-dns):

  ```
  resolvers 8.8.8.8 8.8.4.4
  ```

* **preferred_chains** specifies which certificate chains Caddy should prefer; useful if your CA provides multiple chains. Use one of the following options:

  * **smallest** will tell Caddy to prefer chains with the fewest amount of bytes.
  * **root_common_name** is a list of one or more common names; Caddy will choose the first chain that has a root that matches with at least one of the specified common names.
  * **any_common_name** is a list of one or more common names; Caddy will choose the first chain that has an issuer that matches with at least one of the specified common names.

#### zerossl[🔗](https://caddyserver.com/docs/caddyfile/directives/tls#zerossl "Direct link")

Obtains certificates using [ZeroSSL's proprietary certificate issuance API](https://zerossl.com/documentation/api/). An API key is required and payment may also be required depending on your plan. Note that this issue is distinct from [ZeroSSL's ACME endpoint](https://zerossl.com/documentation/acme/). To use ZeroSSL's ACME endpoint, use the `acme` issuer described above configured with ZeroSSL's ACME directory endpoint.

```
... zerossl <api_key> {
	validity_days <days>
	alt_http_port <port>
	dns <provider_name> ...
	propagation_delay <duration>
	propagation_timeout <duration>
	resolvers <list...>
	dns_ttl <duration>
}
```

* **validity_days** defines the certificate lifetime. Only certain values are accepted; see [ZeroSSL's docs](https://zerossl.com/documentation/api/create-certificate/) for details.

<!---->

* **alt_http_port** is the port to use for completing ZeroSSL's HTTP validation, if not port 80.
* **dns** enables CNAME validation method using the named DNS provider with the given configuration for automatic record provisioning. The DNS provider plugin must be installed from the [`caddy-dns` ![](https://caddyserver.com/old/resources/images/external-link.svg)](https://github.com/caddy-dns) repositories. Each provider plugin may have their own syntax following their name; refer to their docs for details. Maintaining support for each DNS provider is a community effort.
* **propagation_delay** is how long to wait before checking for CNAME record propagation.
* **propagation_timeout** is how long to wait for CNAME record propagation before giving up.
* **resolvers** defines custom DNS resolvers to use when checking for CNAME record propagation.
* **dns_ttl** configures the TTL for CNAME records created as part of the validation process.

#### internal[🔗](https://caddyserver.com/docs/caddyfile/directives/tls#internal "Direct link")

Obtains certificates from an internal certificate authority.

```
... internal {
	ca       <name>
	lifetime <duration>
	sign_with_root
}
```

* **ca** is the name of the internal CA to use. Default: `local`. See the [PKI app global options](https://caddyserver.com/docs/caddyfile/options#pki-options) to configure the `local` CA, or to create alternate CAs.

  By default, the root CA certificate has a `3600d` lifetime (10 years) and the intermediate has a `7d` lifetime (7 days).

  Caddy will attempt to install the root CA certificate to the system trust store, but this may fail when Caddy is running as an unprivileged user, or when running in a Docker container. In that case, the root CA certificate will need to be manually installed, either by using the [`caddy trust`](https://caddyserver.com/docs/command-line#caddy-trust) command, or by [copying out of the container](https://caddyserver.com/docs/running#usage).

* **lifetime** is a [duration value](https://caddyserver.com/docs/conventions#durations) that sets the validity period for interally issued leaf certificates. Default: `12h`. It is NOT recommended to change this, unless absolutely necessary. It must be shorter than the intermediate's lifetime.

* **sign_with_root** forces the root to be the issuer instead of the intermediate. This is NOT recommended and should only be used when devices/clients do not properly validate certificate chains (very uncommon).

### Certificate Managers[🔗](https://caddyserver.com/docs/caddyfile/directives/tls#certificate-managers "Direct link")

Certificate manager modules are distinct from issuer modules in that use of manager modules implies that an external tool or service is keeping the certificate renewed, whereas an issuer module implies that Caddy itself is managing the certificate. (Issuer modules take a Certificate Signing Request (CSR) as input, but certificate manager modules take a TLS ClientHello as input.)

These manager modules come standard with the `tls` directive:

#### tailscale[🔗](https://caddyserver.com/docs/caddyfile/directives/tls#tailscale "Direct link")

Get certificates from a locally-running [Tailscale ![](https://caddyserver.com/old/resources/images/external-link.svg)](https://tailscale.com/) instance. [HTTPS must be enabled in your Tailscale account](https://tailscale.com/kb/1153/enabling-https/) (or your open source [Headscale server ![](https://caddyserver.com/old/resources/images/external-link.svg)](https://github.com/juanfont/headscale)); and the Caddy process must either be running as root, or you must configure `tailscaled` to give your Caddy user [permission to fetch certificates](https://github.com/caddyserver/caddy/pull/4541#issuecomment-1021568348).

***NOTE: This is usually unnecessary!** Caddy automatically uses Tailscale for all `*.ts.net` domains without any extra configuration.*

```
get_certificate tailscale  # often unnecessary!
```

#### http[🔗](https://caddyserver.com/docs/caddyfile/directives/tls#http-1 "Direct link")

Get certificates by making an HTTP(S) request. The response must have a `200` status code and the body must contain a PEM chain including the full certificate (with intermediates) as well as the private key.

```
get_certificate http <url>
```

* **url** is the fully-qualified URL to which to make the request. It is strongly advised that this be a local endpoint for performance reasons. The URL will be augmented with the following query string parameters:

  * `server_name`: SNI value
  * `signature_schemes`: comma-separated list of hex IDs of signature algorithms
  * `cipher_suites`: comma-separated list of hex IDS of cipher suites

## Examples[🔗](https://caddyserver.com/docs/caddyfile/directives/tls#examples "Direct link")

Use a custom certificate and key. The certificate should have [SANs](https://en.wikipedia.org/wiki/Subject_Alternative_Name) that match the site address:

```
example.com {
	tls cert.pem key.pem
}
```

Use [locally-trusted](https://caddyserver.com/docs/automatic-https#local-https) certificates for all hosts on the current site block, rather than public certificates via ACME / Let's Encrypt (useful in dev environments):

```
example.com {
	tls internal
}
```

Use locally-trusted certificates, but managed [On-Demand](https://caddyserver.com/docs/automatic-https#on-demand-tls) instead of in the background. This allows you to point any domain at your Caddy instance and have it automatically provision a certificate for you. This SHOULD NOT be used if your Caddy instance is publicly accessible, since an attacker could use it to exhaust your server's resources:

```
https:// {
	tls internal {
		on_demand
	}
}
```

Use custom options for the internal CA (cannot use the `tls internal` shortcut):

```
example.com {
	tls {
		issuer internal {
			ca foo
		}
	}
}
```

Specify an email address for your ACME account (but if only one email is used for all sites, we recommend the `email` [global option](https://caddyserver.com/docs/caddyfile/options) instead):

```
example.com {
	tls your@email.com
}
```

Enable the DNS challenge for a domain managed on Cloudflare with account credentials in an environment variable. This unlocks wildcard certificate support, which requires DNS validation:

```
*.example.com {
	tls {
		dns cloudflare {env.CLOUDFLARE_API_TOKEN}
	}
}
```

Get the certificate chain via HTTP, instead of having Caddy manage it. Note that [`get_certificate`](https://caddyserver.com/docs/caddyfile/directives/tls#certificate-managers) implies [`on_demand`](https://caddyserver.com/docs/caddyfile/directives/tls#on_demand) is enabled, fetching certificates using a module instead of triggering ACME issuance:

```
https:// {
	tls {
		get_certificate http http://localhost:9007/certs
	}
}
```

Enable TLS Client Authentication and require clients to present a valid certificate that is verified against all the provided CA's via `trusted_ca_cert_file`

```
example.com {
	tls {
		client_auth {
			mode                 require_and_verify
			trusted_ca_cert_file ../caddy.ca.cer
			trusted_ca_cert_file ../root.ca.cer
		}
	}
}
```
