import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const myCustomTheme: CustomThemeConfig = {
  name: 'my-custom-theme',
  properties: {
    // =~= Theme Properties =~=
    "--theme-font-family-base": `system-ui`,
    "--theme-font-family-heading": `system-ui`,
    "--theme-font-color-base": "0 0 0",
    "--theme-font-color-dark": "255 255 255",
    "--theme-rounded-base": "9999px",
    "--theme-rounded-container": "8px",
    "--theme-border-base": "1px",
    // =~= Theme On-X Colors =~=
    "--on-primary": "255 255 255",
    "--on-secondary": "0 0 0",
    "--on-tertiary": "0 0 0",
    "--on-success": "255 255 255",
    "--on-warning": "0 0 0",
    "--on-error": "255 255 255",
    "--on-surface": "255 255 255",
    // =~= Theme Colors  =~=
    // primary | #00522e 
    "--color-primary-50": "217 229 224", // #d9e5e0
    "--color-primary-100": "204 220 213", // #ccdcd5
    "--color-primary-200": "191 212 203", // #bfd4cb
    "--color-primary-300": "153 186 171", // #99baab
    "--color-primary-400": "77 134 109", // #4d866d
    "--color-primary-500": "0 82 46", // #00522e
    "--color-primary-600": "0 74 41", // #004a29
    "--color-primary-700": "0 62 35", // #003e23
    "--color-primary-800": "0 49 28", // #00311c
    "--color-primary-900": "0 40 23", // #002817
    // secondary | #5fd397 
    "--color-secondary-50": "231 248 239", // #e7f8ef
    "--color-secondary-100": "223 246 234", // #dff6ea
    "--color-secondary-200": "215 244 229", // #d7f4e5
    "--color-secondary-300": "191 237 213", // #bfedd5
    "--color-secondary-400": "143 224 182", // #8fe0b6
    "--color-secondary-500": "95 211 151", // #5fd397
    "--color-secondary-600": "86 190 136", // #56be88
    "--color-secondary-700": "71 158 113", // #479e71
    "--color-secondary-800": "57 127 91", // #397f5b
    "--color-secondary-900": "47 103 74", // #2f674a
    // tertiary | #4571f5 
    "--color-tertiary-50": "227 234 254", // #e3eafe
    "--color-tertiary-100": "218 227 253", // #dae3fd
    "--color-tertiary-200": "209 220 253", // #d1dcfd
    "--color-tertiary-300": "181 198 251", // #b5c6fb
    "--color-tertiary-400": "125 156 248", // #7d9cf8
    "--color-tertiary-500": "69 113 245", // #4571f5
    "--color-tertiary-600": "62 102 221", // #3e66dd
    "--color-tertiary-700": "52 85 184", // #3455b8
    "--color-tertiary-800": "41 68 147", // #294493
    "--color-tertiary-900": "34 55 120", // #223778
    // success | #263fa4 
    "--color-success-50": "222 226 241", // #dee2f1
    "--color-success-100": "212 217 237", // #d4d9ed
    "--color-success-200": "201 207 232", // #c9cfe8
    "--color-success-300": "168 178 219", // #a8b2db
    "--color-success-400": "103 121 191", // #6779bf
    "--color-success-500": "38 63 164", // #263fa4
    "--color-success-600": "34 57 148", // #223994
    "--color-success-700": "29 47 123", // #1d2f7b
    "--color-success-800": "23 38 98", // #172662
    "--color-success-900": "19 31 80", // #131f50
    // warning | #f1c6c6 
    "--color-warning-50": "253 246 246", // #fdf6f6
    "--color-warning-100": "252 244 244", // #fcf4f4
    "--color-warning-200": "252 241 241", // #fcf1f1
    "--color-warning-300": "249 232 232", // #f9e8e8
    "--color-warning-400": "245 215 215", // #f5d7d7
    "--color-warning-500": "241 198 198", // #f1c6c6
    "--color-warning-600": "217 178 178", // #d9b2b2
    "--color-warning-700": "181 149 149", // #b59595
    "--color-warning-800": "145 119 119", // #917777
    "--color-warning-900": "118 97 97", // #766161
    // error | #6a3adb 
    "--color-error-50": "233 225 250", // #e9e1fa
    "--color-error-100": "225 216 248", // #e1d8f8
    "--color-error-200": "218 206 246", // #dacef6
    "--color-error-300": "195 176 241", // #c3b0f1
    "--color-error-400": "151 117 230", // #9775e6
    "--color-error-500": "106 58 219", // #6a3adb
    "--color-error-600": "95 52 197", // #5f34c5
    "--color-error-700": "80 44 164", // #502ca4
    "--color-error-800": "64 35 131", // #402383
    "--color-error-900": "52 28 107", // #341c6b
    // surface | #275a93 
    "--color-surface-50": "223 230 239", // #dfe6ef
    "--color-surface-100": "212 222 233", // #d4dee9
    "--color-surface-200": "201 214 228", // #c9d6e4
    "--color-surface-300": "169 189 212", // #a9bdd4
    "--color-surface-400": "104 140 179", // #688cb3
    "--color-surface-500": "39 90 147", // #275a93
    "--color-surface-600": "35 81 132", // #235184
    "--color-surface-700": "29 68 110", // #1d446e
    "--color-surface-800": "23 54 88", // #173658
    "--color-surface-900": "19 44 72", // #132c48

  }
}