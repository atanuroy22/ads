# AdSense Optimized Word Counter Tool

This repository contains a fully functional, AdSense-optimized "Word Counter" web tool. It is designed to meet Google AdSense requirements for original content and utility, making it easier to get approved compared to a generic "Lorem Ipsum" site.

## 🚀 Features

-   **Functional Tool**: A real-time Word, Character, and Paragraph counter with Reading Time estimation.
-   **AdSense Ready**: Pre-configured ad placements (Header, In-Article, Sidebar).
-   **Compliance Pages**: Includes `privacy.html`, `terms.html`, and `contact.html` (Required for AdSense).
-   **Cookie Consent**: Built-in GDPR/CPRA compliant cookie banner.
-   **SEO Optimized**: Proper meta tags, semantic HTML5, and fast loading speed.

## 🛠 Setup & Deployment

### 1. AdSense Configuration

1.  **Publisher ID**: Open `index.html`, `privacy.html`, `terms.html`, and `contact.html`. Confirm that `ca-pub-5977886352638887` matches your ID.
2.  **Ad Units**:
    *   Go to your AdSense Dashboard > Ads > By ad unit.
    *   Create a **Display Ad** (Header), **In-article Ad** (Content), and **Display Ad** (Sidebar).
    *   Replace the `data-ad-slot` numbers in `index.html` (and other pages if you add ads there) with your generated IDs.
    *   *Note*: The current files use placeholders like `1234567890`. **You MUST replace these** for ads to show.

### 2. Custom Domain Setup (GitHub Pages)

To look professional and get AdSense approval, a custom domain (e.g., `www.mycooltools.com`) is highly recommended over `username.github.io`.

**Step A: Buy a Domain**
Purchase a domain from a registrar (Namecheap, GoDaddy, Google Domains, etc.).

**Step B: Configure DNS**
Go to your domain registrar's DNS settings and add the following records:

1.  **A Records** (Point root domain to GitHub):
    *   Host: `@` | Value: `185.199.108.153`
    *   Host: `@` | Value: `185.199.109.153`
    *   Host: `@` | Value: `185.199.110.153`
    *   Host: `@` | Value: `185.199.111.153`
2.  **CNAME Record** (Point `www` to your GitHub URL):
    *   Host: `www` | Value: `<your-github-username>.github.io`

**Step C: GitHub Configuration**
1.  In this repository, go to **Settings > Pages**.
2.  Under **Custom domain**, enter your domain (e.g., `www.mycooltools.com`).
3.  Click **Save**. This will automatically create a `CNAME` file in your repository.
4.  Check **Enforce HTTPS** (Wait a few minutes if it's not available yet).

### 3. Contact Info
Open `contact.html` and `privacy.html` and replace `contact@example.com` and the address with your real contact details. AdSense requires a valid way for users to contact you.

### 4. ads.txt Implementation
An `ads.txt` file has been created in the root directory to authorize Google to sell your ad inventory.

**Verification:**
After deploying to GitHub Pages and setting up your custom domain, verify that the file is accessible at:
`https://atanu.qzz.io/ads.txt`

It should display:
`google.com, pub-5977886352638887, DIRECT, f08c47fec0942fa0`

## 📂 Directory Structure

*   `index.html`: Main tool page.
*   `privacy.html`: Privacy Policy (Required).
*   `terms.html`: Terms of Service (Required).
*   `contact.html`: Contact Page (Required).
*   `css/`: Stylesheets (`style.css` for layout, `tools.css` for tool specific styles).
*   `js/`: JavaScript logic (`main.js`).

## 💡 Approval Tips
*   **Traffic**: Try to get some real traffic to the tool before applying. Share it on social media.
*   **Content**: Do not leave any "Lorem Ipsum" or placeholder text. The current text is generic but "real".
*   **Navigation**: Ensure all links in the header and footer work (they are pre-linked in this template).
