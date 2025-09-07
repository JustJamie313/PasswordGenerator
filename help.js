const helpText = `
🔐 PasswordGenerator CLI Tool — Help

Usage:
  generate pw <length> [flag]

Arguments:
  <length>     Desired password length (integer)
  [flag]       Optional character set restriction (choose one)

Flags:
  -l           Letters only
  -n           Numbers only
  -s           Special characters only
  -ln          Letters + Numbers
  -ls          Letters + Special characters
  -ns          Numbers + Special characters
  <none>       Full character set (Letters + Numbers + Special characters)

Options:
  --help       Display this help text
  --version    Display version information

Features:
  • Generates high-entropy passwords locally
  • Calculates entropy and grades password strength (A+ to F)
  • Automatically copies password to clipboard
  • Excludes problematic special characters by default
  • Designed for transparency, trust, and long-term resilience

Examples:
  generate pw 16
    → Generates a 16-character password using full charset

  generate pw 20 -ln
    → Letters and numbers only

  generate pw 24 -s
    → Symbols only

Notes:
  • Clipboard integration uses clipboardy (OS-dependent)
  • No telemetry. No data storage. Runs entirely offline.
  • For full documentation, see README.md

Author:
  Jamie Miller — Drawing on Humanity`;

export {helpText as default};