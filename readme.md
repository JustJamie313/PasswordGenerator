# 🔐 PasswordGenerator

A lightweight, locally-run Node.js CLI tool for generating secure, high-entropy passwords—without relying on untrusted websites or opaque algorithms.

---

### 🧠 Philosophy

Your data is priceless. This tool was built to protect it.  
No telemetry. No hidden logic. Just clean, auditable code that puts you in control.

---

### ✨ Features

- 🔒 Generates passwords of any length with customizable character sets
- 🧮 Calculates entropy and assigns a strength grade (A+ to F)
- 📋 Automatically copies the password to your clipboard
- 🧼 Excludes problematic special characters to avoid encoding issues
- 🧰 Easy to modify, extend, or integrate into your own scripts

---

### 🚀 Usage

```bash
generate pw <length> [flag]
```
- <length>: Desired password length (integer)
- [flag]: Optional character set restriction (choose one)

🎛️ Flags (choose one)
| Flag | Letters | Numbers | Special Characters | 
|------|:-------:|:-------:|:------------------:| 
| -l   |☑||| 
| -n   ||☑|| 
| -s   |||☑| 
| -ln  |☑|☑|| 
| -ls  |☑||☑| 
| -ns  ||☑|☑|
|<none>|☑|☑|☑|

📈 Strength Grading
Passwords are scored against a target entropy of 125 bits:
| % of Target Entropy | Strength | 
|:-------------------:|:---------| 
|≥100|A+ / Very Strong| 
|≥90|A / Strong| 
|≥80|B / Moderate| 
|≥70|C / Moderate| 
|≥60|D / Weak|
|≤60|F / Weak| 

🧪 Examples
```bash
generate pw 16
# Generates a 16-character password using full charset

generate pw 20 -ln
# Letters and numbers only

generate pw 24 -s
# Symbols only

generate --help
# Displays this README
```
🛡️ Author & License
Author: Jamie Miller  
Organization: Drawing on Humanity  
Date: September 4, 2025  
License: Copyrighted Material
	 ©2025 - Jamie Miller
         All Rights Reserved

💬 Notes
- This tool runs entirely locally—no data is sent or stored.
- Clipboard integration uses clipboardy and may vary by OS.
- Designed for transparency, trust, and long-term resilience.

[![npm version](https://img.shields.io/npm/v/@drawingonhumanity/passwordgenerator.svg)](https://www.npmjs.com/package/@drawingonhumanity/passwordgenerator)
