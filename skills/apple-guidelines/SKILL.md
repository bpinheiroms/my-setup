---
name: apple-guidelines
description: Complete Apple App Store Review Guidelines. Invoke when creating features, screens, or functionality for iOS apps to ensure compliance and avoid rejection.
user-invocable: true
---

# Apple App Store Review Guidelines

When implementing or reviewing any feature for an iOS/iPadOS app, consider ALL the rules below. Proactively identify which guidelines apply to the code/feature in question and alert about possible violations before they cause rejection.

---

## Introduction

The guiding principle of the App Store is simple — provide a safe experience for users to get apps and a great opportunity for all developers to be successful. We do this by offering a highly curated App Store where every app is reviewed by experts and an editorial team helps users discover new apps every day. We also scan each app for malware and other software that may impact user safety, security, and privacy. These efforts have made Apple's platforms the safest for consumers around the world.

In the European Union, developers can also distribute notarized iOS and iPadOS apps from alternative app marketplaces and directly from their website; in Japan, developers can also distribute iOS apps from alternative app marketplaces. Learn more about alternative app marketplaces, Web Distribution, and Notarization for iOS and iPadOS apps.

For everything else there is always the open Internet. If the App Store model and guidelines or alternative distribution and Notarization for iOS and iPadOS apps are not best for your app or business idea that's okay, we provide Safari for a great web experience too.

On the following pages you will find our latest guidelines arranged into five clear sections: Safety, Performance, Business, Design, and Legal. The App Store is always changing and improving to keep up with the needs of our customers and our products. Your apps should change and improve as well in order to stay on the App Store.

A few other points to keep in mind about distributing your app on our platforms:

- We have lots of kids downloading lots of apps. Parental controls work great to protect kids, but you have to do your part too. So know that we're keeping an eye out for the kids.
- The App Store is a great way to reach hundreds of millions of people around the world. If you build an app that you just want to show to family and friends, the App Store isn't the best way to do that. Consider using Xcode to install your app on a device for free or use Ad Hoc distribution available to Apple Developer Program members.
- We strongly support all points of view being represented on the App Store, as long as the apps are respectful to users with differing opinions and the quality of the app experience is great. We will reject apps for any content or behavior that we believe is over the line. What line, you ask? Well, as a Supreme Court Justice once said, "I'll know it when I see it". And we think that you will also know it when you cross it.
- If you attempt to cheat the system (for example, by trying to trick the review process, steal user data, copy another developer's work, manipulate ratings or App Store discovery) your apps will be removed from the store and you will be expelled from the Apple Developer Program.
- You are responsible for making sure everything in your app complies with these guidelines, including ad networks, analytics services, and third-party SDKs, so review and choose them carefully.
- Some features and technologies that are not generally available to developers may be offered as an entitlement for limited use cases. For example, we offer entitlements for CarPlay Audio, HyperVisor, and Privileged File Operations.

---

## Before You Submit

To help your app approval go as smoothly as possible, review the common missteps listed below that can slow down the review process or trigger a rejection. This doesn't replace the guidelines or guarantee approval, but making sure you can check every item on the list is a good start. If your app no longer functions as intended or you're no longer actively supporting it, it will be removed from the App Store.

Make sure you:

- Test your app for crashes and bugs
- Ensure that all app information and metadata is complete and accurate
- Update your contact information in case App Review needs to reach you
- Provide App Review with full access to your app. If your app includes account-based features, provide either an active demo account or fully-featured demo mode, plus any other hardware or resources that might be needed to review your app (e.g. login credentials or a sample QR code)
- Enable backend services so that they're live and accessible during review
- Include detailed explanations of non-obvious features and in-app purchases in the App Review notes, including supporting documentation where appropriate
- Check whether your app follows guidance in other documentation, such as:

**Developer Documentation:** SwiftUI, UIKit, AppKit, App extensions, Optimizing Your App's Data for iCloud Backup, Apple File System, App Store Connect Help, Developer Account Help.

**Design Guidelines:** Human Interface Guidelines.

**Brand and Marketing Guidelines:** Marketing Resources and Identity Guidelines, Apple Pay Marketing Guidelines, Add to Apple Wallet Guidelines, Guidelines for Using Apple Trademarks and Copyrights.

---

## 1. Safety

### 1.1 Objectionable Content

**1.1.1** Defamatory, discriminatory, or malicious content about religion, race, sexual orientation, gender, national/ethnic origin. Political satirists are generally exempt.

**1.1.2** Realistic depictions of people/animals being killed, maimed, tortured. "Enemies" in games cannot be solely from a specific real race/culture/government.

**1.1.3** Depictions that encourage illegal use of weapons or facilitate the purchase of firearms/ammunition.

**1.1.4** Explicit sexual material or pornography. Includes "hookup" apps and apps that facilitate prostitution/human trafficking.

**1.1.5** Inflammatory religious commentary or inaccurate/misleading religious quotes.

**1.1.6** False information and misleading features (fake location trackers, etc.). "For entertainment purposes" does not override this rule. Anonymous call/SMS apps or prank apps will be rejected.

**1.1.7** Harmful concepts that capitalize on recent events (conflicts, terrorist attacks, epidemics).

### 1.2 User-Generated Content (UGC)

Apps with UGC or social networks MUST include:
- A method to filter objectionable material
- A mechanism to report offensive content with timely responses
- Ability to block abusive users
- Published contact information

Apps used primarily for pornography, Chatroulette-type experiences, objectification of real people, physical threats, or bullying will be removed without notice.

**1.2.1 Creator Content:**
Apps which feature content from a specific community of users called "creators" are a great opportunity if properly moderated. These apps present a singular, unified experience for customers to interact with various kinds of creator content. They offer tools and programs to help this community of non-developer creators to author, share, and monetize user-generated experiences. These experiences must not change the core features and functionality of the native app — rather, they add content to those structured experiences. These experiences are not native "apps" coded by developers — they are content within the app itself and are treated as user-generated content by App Review. Such creator content may include video, articles, audio, and even casual games. The App Store supports apps offering such user-generated content so long as they follow all Guidelines, including Guideline 1.2 for moderating user-generated content and Guideline 3.1.1 for payments and in-app purchases. You should communicate to users which content requires additional purchases.

**(a)** Creator apps must provide a way for users to identify content that exceeds the app's age rating, and use an age restriction mechanism based on verified or declared age to limit access by underage users.

### 1.3 Kids Category

- No external links, purchase opportunities, or distractions (except in an area with a parental gate)
- Comply with privacy laws for children's data collection
- No personally identifiable information sent to third parties
- No third-party analytics (except limited cases without IDFA or identifiable information)
- Contextual third-party advertising allowed in limited cases with human review of creatives

### 1.4 Physical Harm

**1.4.1** Medical apps with inaccurate data are reviewed more strictly. Apps must disclose data/methodology. No measurement of X-rays, blood pressure, temperature, glucose, or oxygen using only device sensors.

**1.4.2** Dosage calculators must come from manufacturers, hospitals, universities, insurers, pharmacies, or approved entities, or have FDA/equivalent approval.

**1.4.3** No encouragement of tobacco/vape consumption, illegal drugs, or excessive alcohol. No sale of controlled substances (except licensed pharmacies and legal cannabis dispensaries).

**1.4.4** DUI checkpoints only those published by police. Never encourage drunk driving or reckless behavior.

**1.4.5** Apps must not incite activities (gambling, challenges) or device usage in ways that risk physical harm.

### 1.5 Developer Information

App and Support URL must include an easy way to make contact. Wallet passes must have valid contact information and a dedicated certificate.

### 1.6 Data Security

Implement appropriate security measures to protect user data against unauthorized use, disclosure, or third-party access.

### 1.7 Criminal Activity Reporting

Criminal reporting apps must involve local police and can only be offered where such involvement is active.

---

## 2. Performance

### 2.1 App Completeness

**(a)** Submissions must be final versions with complete metadata and functional URLs. No placeholder text or temporary content. Test on device. Include demo account (or demo mode with prior approval). Incomplete or crashing apps will be rejected.

**(b)** IAPs must be complete, up-to-date, visible, and functional for the reviewer.

### 2.2 Beta Testing

Demos, betas, and trials do not belong on the App Store — use TestFlight. TestFlight apps must comply with App Review Guidelines. No distribution to testers in exchange for compensation.

### 2.3 Accurate Metadata

All metadata (privacy, description, screenshots, previews) must reflect the app's core experience.

**2.3.1(a)** Don't include any hidden, dormant, or undocumented features in your app; your app's functionality should be clear to end users and App Review. All new features, functionality, and product changes must be described with specificity in the Notes for Review section of App Store Connect (generic descriptions will be rejected) and accessible for review. Similarly, marketing your app in a misleading way, such as by promoting content or services that it does not actually offer (e.g. iOS-based virus and malware scanners) or promoting a false price, whether within or outside of the App Store, is grounds for removal of your app from the App Store or a block from installing via alternative distribution and termination of your developer account.

**2.3.1(b)** Egregious or repeated behavior is grounds for removal from the Apple Developer Program. We work hard to make the App Store a trustworthy ecosystem and expect our app developers to follow suit; if you're dishonest, we don't want to do business with you.

**2.3.2** If the app has IAPs, description/screenshots/previews must clearly indicate which items require additional purchase.

**2.3.3** Screenshots must show the app in use, not just title art, login, or splash screen.

**2.3.4** Previews can only use video screen captures from the app. May include narration and explanatory overlays.

**2.3.5** Select the most appropriate category.

**2.3.6** Answer age rating honestly.

**2.3.7** Unique name (max 30 characters). No trademarked terms, popular names, or irrelevant information in metadata. Subtitles without inappropriate content or unverifiable claims.

**2.3.8** Metadata appropriate for all ages (4+ age rating even if app is rated higher). "For Kids"/"For Children" reserved for Kids Category.

**2.3.9** You are responsible for rights to all materials. Use fictional information instead of real data.

**2.3.10** Focused on the Apple experience. No names/icons/images of other mobile platforms in the app or metadata.

**2.3.11** Pre-order apps must be complete and deliverable as submitted.

**2.3.12** "What's New" must clearly describe new features. Bug fixes can use generic description.

**2.3.13** In-app events must be accurate, happen on selected dates, and deep links must direct to the correct destination.

### 2.4 Hardware Compatibility

**2.4.1** iPhone apps must run on iPad when possible.

**2.4.2** Apps must be energy efficient. No excessive battery drain, excessive heat, or cryptocurrency mining.

**2.4.3** Apple TV apps must work without hardware beyond the Siri remote or game controllers.

**2.4.4** Apps must not suggest device restart or unrelated system settings modifications.

**2.4.5** Mac App Store: sandboxed, Xcode technologies, self-contained, no auto-launch, no root, no license screens, updates via Mac App Store, current OS.

### 2.5 Software Requirements

**2.5.1** Only public APIs, current OS. Keep updated, eliminate deprecated features. APIs for intended purposes.

**2.5.2** Self-contained apps. No reading/writing outside the container. No downloading/executing code that changes functionality (except limited educational apps).

**2.5.3** No viruses, malware, or code that damages normal operation.

**2.5.4** Background services only for intended purposes (VoIP, audio, location, etc.).

**2.5.5** Fully functional on IPv6-only networks.

**2.5.6** Web browsing must use WebKit framework.

**2.5.7** Intentionally omitted.

**2.5.8** No alternative desktop/home screen environments.

**2.5.9** Do not alter standard switch functions or native UI elements.

**2.5.10** Intentionally omitted.

**2.5.11 SiriKit/Shortcuts:** Only intents the app can handle. Vocabulary pertinent to the app. Resolve requests as directly as possible, no ads between request and fulfillment.

**2.5.12** CallKit/SMS Fraud Extension: only block numbers confirmed as spam.

**2.5.13** Facial recognition for auth: use LocalAuthentication, alternative method for under 13.

**2.5.14** Explicit consent and visual/audible indication when recording/logging user activity.

**2.5.15** File selection apps must include items from Files app and iCloud.

**2.5.16** Widgets, extensions, and notifications should be related to the content and functionality of your app.

**(a)** Additionally, all App Clip features and functionality must be included in the main app binary. App Clips cannot contain advertising.

**2.5.17** Apps with Matter must use Apple's support framework for Matter to initiate pairing. In addition, if you choose to use any Matter software component in your app other than the Matter SDK provided by Apple, the software component must be certified by the Connectivity Standards Alliance for the platform it runs on.

**2.5.18** Display advertising should be limited to your main app binary, and should not be included in extensions, App Clips, widgets, notifications, keyboards, watchOS apps, etc. Ads displayed in an app must be appropriate for the app's age rating, allow the user to see all information used to target them for that ad (without requiring the user to leave the app), and may not engage in targeted or behavioral advertising based on sensitive user data such as health/medical data (e.g. from the HealthKit APIs), school and classroom data (e.g. from ClassKit), or from kids (e.g. from apps in the App Store's Kids Category), etc. Interstitial ads or ads that interrupt or block the user experience must clearly indicate that they are an ad, must not manipulate or trick users into tapping into them, and must provide easily accessible and visible close/skip buttons large enough for people to easily dismiss the ad. Apps that contain ads must also include the ability for users to report any inappropriate or age-inappropriate ads.

---

## 3. Business

### 3.1 Payments

**3.1.1 In-App Purchase:**

- If you want to unlock features or functionality within your app (by way of example: subscriptions, in-game currencies, game levels, access to premium content, or unlocking a full version), you must use in-app purchase. Apps may not use their own mechanisms to unlock content or functionality, such as license keys, augmented reality markers, QR codes, cryptocurrencies and cryptocurrency wallets, etc.
- Apps may use in-app purchase currencies to enable customers to "tip" the developer or digital content providers in the app.
- Any credits or in-game currencies purchased via in-app purchase may not expire, and you should make sure you have a restore mechanism for any restorable in-app purchases.
- Apps may enable gifting of items that are eligible for in-app purchase to others. Such gifts may only be refunded to the original purchaser and may not be exchanged.
- Apps distributed via the Mac App Store may host plug-ins or extensions that are enabled with mechanisms other than the App Store.
- Apps offering "loot boxes" or other mechanisms that provide randomized virtual items for purchase must disclose the odds of receiving each type of item to customers prior to purchase.
- Digital gift cards, certificates, vouchers, and coupons which can be redeemed for digital goods or services can only be sold in your app using in-app purchase. Physical gift cards that are sold within an app and then mailed to customers may use payment methods other than in-app purchase.
- Non-subscription apps may offer a free time-based trial period before presenting a full unlock option by setting up a Non-Consumable IAP item at Price Tier 0 that follows the naming convention: "XX-day Trial." Prior to the start of the trial, your app must clearly identify its duration, the content or services that will no longer be accessible when the trial ends, and any downstream charges the user would need to pay for full functionality. Learn more about managing content access and the duration of the trial period using Receipts and DeviceCheck.
- Apps may use in-app purchase to sell and sell services related to non-fungible tokens (NFTs), such as minting, listing, and transferring. Apps may allow users to view their own NFTs, provided that NFT ownership does not unlock features or functionality within the app. Apps may allow users to browse NFT collections owned by others, provided that, except for apps on the United States storefront, the apps may not include buttons, external links, or other calls to action that direct customers to purchasing mechanisms other than in-app purchase.

**3.1.1(a) Link to Other Purchase Methods:**

Developers may apply for entitlements to provide a link in their app to a website the developer owns or maintains responsibility for in order to purchase digital content or services. These entitlements are not required for developers to include buttons, external links, or other calls to action in their United States storefront apps.

- **StoreKit External Purchase Link Entitlements:** Apps on the App Store in specific regions may offer in-app purchases and also use a StoreKit External Purchase Link Entitlement to include a link to the developer's website that informs users of other ways to purchase digital goods or services. In accordance with the entitlement agreements, the link may inform users about where and how to purchase those in-app purchase items, and the fact that such items may be available for a comparatively lower price. The entitlements are limited to use only in the iOS or iPadOS App Store in specific storefronts. In all other storefronts, except for the United States storefront, where this prohibition does not apply, apps and their metadata may not include buttons, external links, or other calls to action that direct customers to purchasing mechanisms other than in-app purchase.

- **Music Streaming Services Entitlements:** Music streaming apps in specific regions can use Music Streaming Services Entitlements to include a link (which may take the form of a buy button) to the developer's website that informs users of other ways to purchase digital music content or services. These entitlements also permit music streaming app developers to invite users to provide their email address for the express purpose of sending them a link to the developer's website to purchase digital music content or services. In accordance with the entitlement agreements, the link may inform users about where and how to purchase those in-app purchase items, and the price of such items. The entitlements are limited to use only in the iOS or iPadOS App Store in specific storefronts. In all other storefronts, streaming music apps and their metadata may not include buttons, external links, or other calls to action that direct customers to purchasing mechanisms other than in-app purchase.

- If your app engages in misleading marketing practices, scams, or fraud in relation to the entitlement, your app will be removed from the App Store and you may be removed from the Apple Developer Program.

**3.1.2 Subscriptions:**

Apps may offer auto-renewable in-app purchase subscriptions, regardless of category on the App Store. When incorporating auto-renewable subscriptions into your app, be sure to follow the guidelines below.

**(a) Permissible Uses:** If you offer an auto-renewable subscription, you must provide ongoing value to the customer, and the subscription period must last at least seven days and be available across all of the user's devices. While the following list is not exhaustive, examples of appropriate subscriptions include: new game levels; episodic content; multiplayer support; apps that offer consistent, substantive updates; access to large collections of, or continually updated, media content; software as a service ("SAAS"); and cloud support. In addition:

- Subscriptions may be offered alongside a la carte offerings (e.g. you may offer a subscription to an entire library of films as well the purchase or rental of a single movie).
- Games offered in a streaming game service subscription may offer a single subscription that is shared across third-party apps and services; however, they must be downloaded directly from the App Store, must be designed to avoid duplicate payment by a subscriber, and should not disadvantage non-subscriber customers.
- Subscriptions must work on all of the user's devices where the app is available.
- As with all apps, those offering subscriptions should allow a user to get what they've paid for without performing additional tasks, such as posting on social media, uploading contacts, checking in to the app a certain number of times, etc.
- Subscriptions may include consumable credits, gems, in-game currencies, etc., and you may offer subscriptions that include access to discounted consumable goods (e.g. a platinum membership that exposes gem-packs for a reduced price).
- If you are changing your existing app to a subscription-based business model, you should not take away the primary functionality existing users have already paid for. For example, let customers who have already purchased a "full game unlock" continue to access the full game after you introduce a subscription model for new customers.
- Auto-renewable subscription apps may offer a free trial period to customers by providing the relevant information set forth in App Store Connect.
- Apps that attempt to scam users will be removed from the App Store. This includes apps that attempt to trick users into purchasing a subscription under false pretenses or engage in bait-and-switch and scam practices; these will be removed from the App Store and you may be removed from the Apple Developer Program.
- Cellular carrier apps may include auto-renewable music and video subscriptions when purchased in bundles with new cellular data plans, with prior approval by Apple. Other auto-renewable subscriptions may also be included in bundles when purchased with new cellular data plans, with prior approval by Apple, if the cellular carrier apps support in-app purchase for users. Such subscriptions cannot include access to or discounts on consumable items, and the subscriptions must terminate coincident with the cellular data plan.

**(b) Upgrades and Downgrades:** Users should have a seamless upgrade/downgrade experience and should not be able to inadvertently subscribe to multiple variations of the same thing. Review best practices on managing your subscription upgrade and downgrade options.

**(c) Subscription Information:** Before asking a customer to subscribe, you should clearly describe what the user will get for the price. How many issues per month? How much cloud storage? What kind of access to your service? Ensure you clearly communicate the requirements described in Schedule 2 of the Apple Developer Program License Agreement.

**3.1.3 Other Purchase Methods:**

The following apps may use purchase methods other than in-app purchase. Apps in this section cannot, within the app, encourage users to use a purchasing method other than in-app purchase, except for apps on the United States storefront and as set forth in 3.1.1(a) and 3.1.3(a). Developers can send communications outside of the app to their user base about purchasing methods other than in-app purchase.

**(a) "Reader" Apps:** Apps may allow a user to access previously purchased content or content subscriptions (specifically: magazines, newspapers, books, audio, music, and video). Reader apps may offer account creation for free tiers, and account management functionality for existing customers. Reader app developers may apply for the External Link Account Entitlement to provide an informational link in their app to a web site the developer owns or maintains responsibility for in order to create or manage an account. This entitlement is not required for developers to include buttons, external links, or other calls to action in their United States storefront apps.

**(b) Multiplatform Services:** Apps that operate across multiple platforms may allow users to access content, subscriptions, or features they have acquired in your app on other platforms or your web site, including consumable items in multi-platform games, provided those items are also available as in-app purchases within the app.

**(c) Enterprise Services:** If your app is only sold directly by you to organizations or groups for their employees or students (for example professional databases and classroom management tools), you may allow enterprise users to access previously-purchased content or subscriptions. Consumer, single user, or family sales must use in-app purchase.

**(d) Person-to-Person Services:** If your app enables the purchase of real-time person-to-person services between two individuals (for example tutoring students, medical consultations, real estate tours, or fitness training), you may use purchase methods other than in-app purchase to collect those payments. One-to-few and one-to-many real-time services must use in-app purchase.

**(e) Goods and Services Outside of the App:** If your app enables people to purchase physical goods or services that will be consumed outside of the app, you must use purchase methods other than in-app purchase to collect those payments, such as Apple Pay or traditional credit card entry.

**(f) Free Stand-alone Apps:** Free apps acting as a stand-alone companion to a paid web based tool (i.e. VoIP, Cloud Storage, Email Services, Web Hosting) do not need to use in-app purchase, provided there is no purchasing inside the app, or calls to action for purchase outside of the app.

**(g) Advertising Management Apps:** Apps for the sole purpose of allowing advertisers (persons or companies that advertise a product, service, or event) to purchase and manage advertising campaigns across media types (television, outdoor, websites, apps, etc.) do not need to use in-app purchase. These apps are intended for campaign management purposes and do not display the advertisements themselves. Digital purchases for content that is experienced or consumed in an app, including buying advertisements to display in the same app (such as sales of "boosts" for posts in a social media app) must use in-app purchase.

**3.1.4 Hardware-Specific Content:** In limited circumstances, such as when features are dependent upon specific hardware to function, the app may unlock that functionality without using in-app purchase (e.g. an astronomy app that adds features when synced with a telescope). App features that work in combination with an approved physical product (such as a toy) on an optional basis may unlock functionality without using in-app purchase, provided that an in-app purchase option is available as well. You may not, however, require users to purchase unrelated products or engage in advertising or marketing activities to unlock app functionality.

**3.1.5 Cryptocurrencies:**
- Wallets: only by organizations
- Mining: only off-device
- Exchanges: with appropriate licensing
- ICOs: only established banks/firms
- No currency for tasks (downloading apps, social posts, etc.)

### 3.2 Other Business Models

**3.2.1 Acceptable:**
- **(i)** Promote own apps (if not a mere catalog)
- **(ii)** Collection of third-party apps for a specific need (with robust editorial content)
- **(iii)** Disable access to rental content after period
- **(iv)** Wallet passes for payments, offers, identification
- **(v)** Insurance apps: free, no IAP
- **(vi)** Approved nonprofits: fundraising with Apple Pay
- **(vii)** Individual monetary gifts (100% to recipient, unrelated to digital content)
- **(viii)** Financial apps submitted by the financial institution

**3.2.2 Unacceptable:**
- **(i)** Creating an interface for displaying third-party apps, extensions, or plug-ins similar to the App Store or as a general-interest collection.
- **(ii)** Intentionally omitted.
- **(iii)** Artificially increasing the number of impressions or click-throughs of ads, as well as apps that are designed predominantly for the display of ads.
- **(iv)** Unless you are an approved nonprofit or otherwise permitted under Section 3.2.1(vi) above, collecting funds within the app for charities and fundraisers. Apps that seek to raise money for such causes must be free on the App Store and may only collect funds outside of the app, such as via Safari or SMS.
- **(v)** Arbitrarily restricting who may use the app, such as by location or carrier.
- **(vi)** Intentionally omitted.
- **(vii)** Artificially manipulating a user's visibility, status, or rank on other services unless permitted by that service's Terms and Conditions.
- **(viii)** Apps that facilitate binary options trading are not permitted on the App Store. Consider a web app instead. Apps that facilitate trading in contracts for difference ("CFDs") or other derivatives (e.g. FOREX) must be properly licensed in all jurisdictions where the service is available.
- **(ix)** Apps offering personal loans must clearly and conspicuously disclose all loan terms, including but not limited to equivalent maximum Annual Percentage Rate (APR) and payment due date. Loan apps may not charge a maximum APR higher than 36%, including costs and fees, and may not require repayment in full in 60 days or less.
- **(x)** Apps must not force users to rate the app, review the app, download other apps, or other store-related actions in order to access functionality, content, or use of the app. Apps may otherwise incentivize users to take specific actions within apps (e.g. completing a level, watching an ad).

---

## 4. Design

### 4.1 Copies

**(a)** Original ideas. No copying popular apps with minimal changes.

**(b)** Impersonating other apps/services = violation of the Developer Code of Conduct.

**(c)** Do not use another developer's icon/brand/name without approval.

### 4.2 Minimum Functionality

Your app should include features, content, and UI that elevate it beyond a repackaged website. If your app is not particularly useful, unique, or "app-like," it doesn't belong on the App Store. If your App doesn't provide some sort of lasting entertainment value or adequate utility, it may not be accepted. Apps that are simply a song or movie should be submitted to the iTunes Store. Apps that are simply a book or game guide should be submitted to the Apple Books Store.

**4.2.1** Apps using ARKit should provide rich and integrated augmented reality experiences; merely dropping a model into an AR view or replaying animation is not enough.

**4.2.2** Other than catalogs, apps shouldn't primarily be marketing materials, advertisements, web clippings, content aggregators, or a collection of links.

**4.2.3**
- **(i)** Your app should work on its own without requiring installation of another app to function.
- **(ii)** If your app needs to download additional resources in order to function on initial launch, disclose the size of the download and prompt users before doing so.

**4.2.4** Intentionally omitted.

**4.2.5** Intentionally omitted.

**4.2.6** Apps created from a commercialized template or app generation service will be rejected unless they are submitted directly by the provider of the app's content. These services should not submit apps on behalf of their clients and should offer tools that let their clients create customized, innovative apps that provide unique customer experiences. Another acceptable option for template providers is to create a single binary to host all client content in an aggregated or "picker" model, for example as a restaurant finder app with separate customized entries or pages for each client restaurant, or as an event app with separate entries for each client event.

**4.2.7 Remote Desktop Clients:** If your remote desktop app acts as a mirror of specific software or services rather than a generic mirror of the host device, it must comply with the following:
- **(a)** The app must only connect to a user-owned host device that is a personal computer or dedicated game console owned by the user, and both the host device and client must be connected on a local and LAN-based network.
- **(b)** Any software or services appearing in the client are fully executed on the host device, rendered on the screen of the host device, and may not use APIs or platform features beyond what is required to stream the Remote Desktop.
- **(c)** All account creation and management must be initiated from the host device.
- **(d)** The UI appearing on the client does not resemble an iOS or App Store view, does not provide a store-like interface, or include the ability to browse, select, or purchase software not already owned or licensed by the user. For the sake of clarity, transactions taking place within mirrored software do not need to use in-app purchase, provided the transactions are processed on the host device.
- **(e)** Thin clients for cloud-based apps are not appropriate for the App Store.

### 4.3 Spam

**(a)** No multiple Bundle IDs for the same app. Use IAP for variations.

**(b)** Do not saturate categories with apps lacking quality/uniqueness. Spamming the store may lead to your removal from the Apple Developer Program.

### 4.4 Extensions

Apps hosting or containing extensions must comply with the App Extension Programming Guide, the Safari app extensions documentation, or the Safari web extensions documentation and should include some functionality, such as help screens and settings interfaces where possible. You should clearly and accurately disclose what extensions are made available in the app's marketing text, and the extensions may not include marketing, advertising, or in-app purchases.

**4.4.1 Keyboard Extensions** have some additional rules.

They must:
- Provide keyboard input functionality (e.g. typed characters);
- Follow Sticker guidelines if the keyboard includes images or emoji;
- Provide a method for progressing to the next keyboard;
- Remain functional without full network access and without requiring full access;
- Collect user activity only to enhance the functionality of the user's keyboard extension on the iOS device.

They must not:
- Launch other apps besides Settings; or
- Repurpose keyboard buttons for other behaviors (e.g. holding down the "return" key to launch the camera).

**4.4.2 Safari extensions** must run on the current version of Safari on the relevant Apple operating system. They may not interfere with System or Safari UI elements and must never include malicious or misleading content or code. Violating this rule will lead to removal from the Apple Developer Program. Safari extensions should not claim access to more websites than strictly necessary to function.

**4.4.3** Intentionally omitted.

### 4.5 Apple Sites and Services

**4.5.1** Apps may use approved Apple RSS feeds such as the iTunes Store RSS feed, but may not scrape any information from Apple sites (e.g. apple.com, the iTunes Store, App Store, App Store Connect, developer portal, etc.) or create rankings using this information.

**4.5.2 Apple Music:**

**(i)** MusicKit on iOS lets users play Apple Music and their local music library natively from your apps and games. When a user provides permission to their Apple Music account, your app can create playlists, add songs to their library, and play any of the millions of songs in the Apple Music catalog. Users must initiate the playback of an Apple Music stream and be able to navigate using standard media controls such as "play," "pause," and "skip." Moreover, your app may not require payment or indirectly monetize access to the Apple Music service (e.g. in-app purchase, advertising, requesting user info, etc.). Do not download, upload, or enable sharing of music files sourced from the MusicKit APIs, except as explicitly permitted in MusicKit documentation.

**(ii)** Using the MusicKit APIs is not a replacement for securing the licenses you might need for a deeper or more complex music integration. For example, if you want your app to play a specific song at a particular moment, or to create audio or video files that can be shared to social media, you'll need to contact rights-holders directly to get their permission (e.g. synchronization or adaptation rights) and assets. Cover art and other metadata may only be used in connection with music playback or playlists (including screenshots displaying your app's functionality), and should not be used in any marketing or advertising without getting specific authorization from rights-holders. Make sure to follow the Apple Music Identity Guidelines when integrating Apple Music services in your app.

**(iii)** Apps that access Apple Music user data, such as playlists and favorites, must clearly disclose this access in the purpose string. Any data collected may not be shared with third parties for any purpose other than supporting or improving the app experience. This data may not be used to identify users or devices, or to target advertising.

**4.5.3** Do not use Apple Services to spam, phish, or send unsolicited messages to customers, including Game Center, Push Notifications, etc. Do not attempt to reverse lookup, trace, relate, associate, mine, harvest, or otherwise exploit Player IDs, aliases, or other information obtained through Game Center, or you will be removed from the Apple Developer Program.

**4.5.4 Push Notifications** must not be required for the app to function, and should not be used to send sensitive personal or confidential information. Push Notifications should not be used for promotions or direct marketing purposes unless customers have explicitly opted in to receive them via consent language displayed in your app's UI, and you provide a method in your app for a user to opt out from receiving such messages. Abuse of these services may result in revocation of your privileges.

**4.5.5** Only use Game Center Player IDs in a manner approved by the Game Center terms and do not display them in the app or to any third party.

**4.5.6** Apps may use Unicode characters that render as Apple emoji in their app and app metadata. Apple emoji may not be used on other platforms or embedded directly in your app binary.

### 4.6

Intentionally omitted.

### 4.7 Mini Apps, Mini Games, Streaming Games, Chatbots, Plugins, Game Emulators

Apps may offer non-embedded software (HTML5/JS mini apps, streaming games, chatbots, plugins, retro emulators).

**4.7.1** Software must: follow privacy guidelines, include content filtering/report/block, follow Guideline 3.1 for digital goods.

**4.7.2** Do not expose native APIs without Apple permission.

**4.7.3** Do not share data/permissions with individual software without explicit consent.

**4.7.4** Provide a software index with universal links.

**4.7.5** Identify software that exceeds age rating, age restriction mechanism.

### 4.8 Login Services

Apps with social login (Facebook, Google, Twitter, LinkedIn, Amazon, WeChat) MUST offer an equivalent option that:
- Limits collection to name and email
- Allows keeping email private
- Does not collect interactions for advertising without consent

**Exceptions:** own login system, alternative marketplace, educational/enterprise app, government ID, specific third-party service client.

### 4.9 Apple Pay

Provide all material information before the sale. Follow Apple Pay Marketing Guidelines and HIG. Recurring payments must disclose: renewal term, content per period, amounts, how to cancel.

### 4.10 Monetizing Built-In Capabilities

You may not monetize built-in capabilities provided by the hardware or operating system, such as Push Notifications, the camera, or the gyroscope; or Apple services and technologies, such as Apple Music access, iCloud storage, or Screen Time APIs.

---

## 5. Legal

### 5.1 Privacy

**5.1.1 Data Collection and Storage:**

**(i) Privacy Policies:** Required in App Store Connect and within the app. Must identify: data collected, how collected, all uses, third parties shared with, retention/deletion policies, how to revoke consent.

**(ii) Permission:** User consent for collection (even anonymous data). Paid functionality cannot depend on data access. Easy way to withdraw consent.

**(iii) Minimization:** Only data relevant to core functionality. Use out-of-process picker when possible.

**(iv) Access:** Respect permission settings. Do not manipulate/force consent. Alternatives for those who do not consent.

**(v) Account Sign-In:** If your app doesn't include significant account-based features, let people use it without a login. If your app supports account creation, you must also offer account deletion within the app. Apps may not require users to enter personal information to function, except when directly relevant to the core functionality of the app or required by law. If your core app functionality is not related to a specific social network (e.g. Facebook, WeChat, Weibo, X, etc.), you must provide access without a login or via another mechanism. Pulling basic profile information, sharing to the social network, or inviting friends to use the app are not considered core app functionality. The app must also include a mechanism to revoke social network credentials and disable data access between the app and social network from within the app. An app may not store credentials or tokens to social networks off of the device and may only use such credentials or tokens to directly connect to the social network from the app itself while the app is in use.

**(vi)** Discovering passwords/private data = removal from the program.

**(vii)** SafariViewController visible, no tracking without consent.

**(viii)** Do not compile personal information from non-direct sources without explicit consent.

**(ix)** Apps in regulated fields (banking, healthcare, gambling, cannabis, air travel, crypto) must be submitted by a legal entity.

**(x)** Requesting basic contact information is ok if optional and does not condition features.

**5.1.2 Data Use and Sharing:**

**(i)** Do not use/transmit/share personal data without permission. Disclose sharing with third parties (including third-party AI). App Tracking Transparency required for tracking. Do not force enabling push/location/tracking to access functionality.

**(ii)** Data collected for one purpose cannot be repurposed without additional consent.

**(iii)** Do not surreptitiously build user profiles. Do not identify anonymous users.

**(iv)** Do not use Contacts/Photos to build a database for sale. Do not collect information about other installed apps.

**(v)** Do not contact people via Contacts/Photos except by explicit user initiative (individual, no Select All).

**(vi)** Data from HomeKit, HealthKit, Clinical Health Records, MovementDisorder, ClassKit, facial mapping: no use for marketing/advertising/data mining.

**(vii)** Apple Pay data: share with third parties only to facilitate/improve delivery.

**5.1.3 Health and Health Research:**

**(i)** Health/fitness/medical data cannot be used for advertising/marketing/data mining (except improving health management or research with permission).

**(ii)** Do not write false data to HealthKit. Do not store personal health information in iCloud.

**(iii)** Research with humans requires consent (nature, purpose, duration, risks, confidentiality, contact, withdrawal).

**(iv)** Independent ethics committee approval required.

**5.1.4 Kids:**

**(a)** Be careful with children's personal data. Comply with COPPA, GDPR, etc. Kids apps without third-party analytics/advertising (except limited cases per 1.3).

**(b)** Apps in Kids Category or that collect/transmit personal information from minors must have a privacy policy and comply with children's privacy laws.

**5.1.5 Location Services:**

Only when directly relevant. No use for emergency services or autonomous vehicle control (except lightweight drones). Notify and obtain consent before collecting/transmitting location data.

### 5.2 Intellectual Property

**5.2.1** No protected material without permission. Apps submitted by the IP owner/licensee.

**5.2.2** Third-party services: verify terms of use.

**5.2.3** No illegal downloading/saving of third-party media (Apple Music, YouTube, SoundCloud, Vimeo).

**5.2.4** Do not suggest/imply Apple endorsement.

**5.2.5** Don't create an app that appears confusingly similar to an existing Apple product, interface (e.g. Finder), app (such as the App Store, iTunes Store, or Messages) or advertising theme. Apps and extensions, including third-party keyboards and Sticker packs, may not include Apple emoji. Music from iTunes and Apple Music previews may not be used for their entertainment value (e.g. as the background music to a photo collage or the soundtrack to a game) or in any other unauthorized manner. If you provide music previews from iTunes or Apple Music, you must display a link to the corresponding music in iTunes or Apple Music. If your app displays Activity rings, they should not visualize Move, Exercise, or Stand data in a way that resembles the Activity control. The Human Interface Guidelines have more information on how to use Activity rings. If your app displays Apple Weather data, it should follow the attribution requirements provided in the WeatherKit documentation.

### 5.3 Gaming, Gambling, and Lotteries

Gaming, gambling, and lotteries can be tricky to manage and tend to be one of the most regulated offerings on the App Store. Only include this functionality if you've fully vetted your legal obligations everywhere you make your app available and are prepared for extra time during the review process. Some things to keep in mind:

**5.3.1** Sweepstakes and contests must be sponsored by the developer of the app.

**5.3.2** Official rules for sweepstakes, contests, and raffles must be presented in the app and make clear that Apple is not a sponsor or involved in the activity in any manner.

**5.3.3** Apps may not use in-app purchase to purchase credit or currency for use in conjunction with real money gaming of any kind.

**5.3.4** Apps that offer real money gaming (e.g. sports betting, poker, casino games, horse racing) or lotteries must have necessary licensing and permissions in the locations where the app is used, must be geo-restricted to those locations, and must be free on the App Store. Illegal gambling aids, including card counters, are not permitted on the App Store. Lottery apps must have consideration, chance, and a prize.

### 5.4 VPN Apps

Use NEVPNManager API, only by organizations. Disclose collected data and usage before purchase. Do not sell/use/disclose data to third parties. Do not violate local laws. If the territory requires a VPN license, provide it in App Review Notes.

### 5.5 Mobile Device Management

Apps that offer Mobile Device Management (MDM) services must request this capability from Apple. Such apps may only be offered by commercial enterprises, educational institutions, or government agencies, and in limited cases, companies using MDM for parental control services or device security. You must make a clear declaration of what user data will be collected and how it will be used on an app screen prior to any user action to purchase or otherwise use the service. MDM apps must not violate any applicable laws. Apps offering MDM services may not sell, use, or disclose to third parties any data for any purpose, and must commit to this in their privacy policy. Apps that do not comply with this guideline will be removed from the App Store and blocked from installing via alternative distribution and you may be removed from the Apple Developer Program.

---

## After You Submit

### Review Status

On average, 90% of submissions are reviewed in less than 24 hours. You'll be notified by email of status changes. You can also check the review status of your submission in App Store Connect or on the App Store Connect app for iPhone and iPad. If your submission is incomplete, review times may be delayed or your submission may not pass.

### Contacting App Review

You can view your past and current submissions to App Review in App Store Connect. If your submission didn't pass review, details are provided, including any specific App Review Guidelines that your submission didn't follow. You can correspond with App Review to resolve the issues before resubmitting the build.

### Appointments

Meet with App Review over Webex to discuss the App Review Guidelines and explore best practices for a smooth review process. In each 30-minute video appointment, you can ask for advice on what to expect during review, how your app can best align with guidelines, reasons for common rejections, and topics related to the process of reviewing your app.

### Appeals

If your app didn't pass review and you feel Apple misunderstood your app's concept and functionality, or that you were treated unfairly by Apple in the course of review, you may choose to submit an appeal to the App Review Board. If you file an appeal, make sure to:
- Provide specific reasons why you believe your app complies with the App Review Guidelines.
- Submit only one appeal per submission that didn't pass review.
- Respond to any requests for additional information before submitting an appeal.

### Expedited Reviews

You can request the review of your app to be expedited if you face extenuating circumstances, such as fixing a critical bug in your app or releasing your app to coincide with an event you're directly associated with.

- **Critical bug fix:** When submitting an expedited review to fix a critical bug, include the steps to reproduce the bug on the current version of your app.
- **Event-related app:** For apps associated with an event, we recommend you plan and schedule the release of your app in App Store Connect. However, if your app is still in review and the launch of your event is quickly approaching, you can request to have your app review expedited. Make sure your request includes the event, date of the event, and your app's association with the event.

### Bug Fix Submissions

If you're submitting a bug fix update for your app and we find additional issues during review, you have the option to resolve the additional issues with your next submission, as long as there are no legal or safety concerns. To accept, simply reply to the offer message in App Store Connect and indicate you would like the current submission to be approved.

### Suggestions

Help improve the App Review Guidelines or identify a need for clarity in our policies by suggesting guideline changes. Your suggestions will be taken into consideration by App Review.

### Report a Concern

If you believe that an app presents a trust or safety concern, or is in violation of the App Review Guidelines, you can share details with us to investigate.

---

## Verification Checklist

When implementing/reviewing features, verify:

- [ ] **UGC**: Has filtering, report, block, contact?
- [ ] **Privacy**: Consent obtained? Data minimized? Privacy policy updated?
- [ ] **Payments**: Using IAP where required? Subscriptions with clear info?
- [ ] **Kids**: If app can be used by children, complies with COPPA/GDPR?
- [ ] **Login**: If using social login, offers equivalent alternative?
- [ ] **Metadata**: Screenshots reflect actual app? Correct age rating?
- [ ] **Content**: No objectionable/discriminatory/violent material?
- [ ] **Performance**: No excessive battery drain? IPv6 functional?
- [ ] **Design**: App has minimum functionality? Not a mere web wrapper?
- [ ] **Location**: Permission justified? Consent obtained?
- [ ] **Health**: Accurate data? No unverifiable claims?
- [ ] **Ads**: Age-appropriate? Not in extensions/widgets? Visible close button? Ad reporting available?
- [ ] **Push**: No spam? Opt-in for marketing? Opt-out available?
- [ ] **Account**: Has account deletion if has account creation?
- [ ] **IP**: Rights to all material? No third-party branding without permission?
- [ ] **Apple Weather**: Attribution requirements followed if using WeatherKit?
- [ ] **App Clips**: All features included in main binary? No ads in App Clips?
