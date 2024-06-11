## Getting Started

In this course, we will explore the technology about NextJs 14 and methodologies required to create an online learning platform similar to Udemy. You will gain hands-on experience in developing a fully functional platform, from initial concept through to deployment.

About the source code of [ucademy](https://github.com/evondev/ucademy-app) is from Evondev who is the tutor of this course. You can access to get the example to study or use.

## Setting up a Next.js 14 Project

First open to your terminal and go to the directory you want to storage this project and go to [nextks.org](https://nextjs.org/) to get the `npx create-next-app@latest` then give it to terminal and enter

```bash
npx create-next-app@latest
```

Waiting for a time to download, you will see some question

```bash
What is your project named? ./
```

In this just type your name of project you want, if you want to get the same name of folder of directory, type `./`

After this you will get some question continue like

```bash
Would you like to use TypeScript? No / Yes
Would you like to use ESLint? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like to use `src/` directory? No / Yes
Would you like to use App Router? (recommended) No / Yes
Would you like to customize the default import alias (@/*)? No / Yes
What import alias would you like configured? @/*
```

In this you just click `yes` and `enter` to finish. After that just waiting to download finish then you are successly to set up the new NextJs

## Structure of NextJs Project

Get started by editing `src/app/`

**favicon.ico**: Typically represents the `favicon for your web application`. A favicon is a `small icon` that `appears in the browser tab`, bookmark bar, and other places to represent your website. It's a crucial part of branding and helps users easily identify and distinguish your website among others.

**global.css**: Used to define `global styles` that apply to the entire application. It's a convenient way to establish consistent styles across different components and pages without needing to import the styles into each individual component.

**layout.tsx**: Typically serves as a `common layout component` that `wraps around other components`, providing a consistent structure and styling across multiple pages.

**page.tsx**: Typically represents a specific page within your application. Each `.tsx` file corresponds to a route in your application, following the file-system based routing convention of Next.js.

## Some of the attribute and concept in NextJs Project

### 1. Metadata

Metadata in a `web application refers to information` about the webpage that is not visible on the page itself but is embedded in the HTML markup. This metadata includes elements such as `title`, `description`, `keywords`, `author`, and `viewport settings`. Metadata plays a `crucial role` in `search engine optimization (SEO)`, `social sharing`, and `accessibility`.

```js
export const metadata: Metadata = {
	title: "Ucademy",
	description:
		"Explore a wide range of courses on Ucademy and enhance your skills.",
};
```

### 2. Google font

#### 2.1 Import a font from Google Font

```js
import { FontName } from "next/font/google";
```

Import many fonr from google

```js
import {FontName, FontName,...} from "next/font/google";'
```

#### 2.2 Declare a variable of font

```js
const variable = FontName({ subsets: ["latin"] });
```

Example you can declare a variable for font Manrope and Roboto

```js
const manrope = Manrope({ subset: ["latin"] });

const roboto = Roboto({ subsets: ["latin"], weight: "400" });
```

You can see, some of font require to have the attribute weight for this variable so to use this variable for this font you need add more attribute like `weight: "value"`. Roboto is an example for this situation.

#### 2.3 Using font variable in the body of the website

In the `layout.tsx`, we can use the font variable in the `body` tag with attribute `className` is `{FontName.className}`

```js
return (
	<html lang="en">
		<body className={FontName.className}>{children}</body>
	</html>
);
```

You also can you many font variable in your `layout.tsx` by modify the body tag with many font variable in `className` tag.

```js
return (
	<html lang="en">
		<body className={`${manrope.className} ${roboto.className} `}>
			{children}
		</body>
	</html>
);
```

However, when this situation, your website will not know which font you want to use default in your website leed to conflict in your website.

#### 2.4 Font Weight

Typography plays a crucial role in web design, affecting both aesthetics and readability. One key aspect of typography is font weight, which determines the thickness of the text.

Font weight defines the thickness of the characters in a typeface. It ranges from 100 to 900, where 100 is the thinnest and 900 is the thickest.

Some of common weights include:

-   100: Thin
-   200: Extra Light
-   300: Light
-   400: Normal (Regular)
-   500: Medium
-   600: Semi Bold
-   700: Bold
-   800: Extra Bold
-   900: Black

You can add some font weight of font you want to use in your website when declare a variable of this font

```js
const roboto = Roboto({ subsets: ["latin"], weight: "400" });
```

You can also add many font weight for this variable font, but if you not define which font weight you want to use, the default it use all font weight of this font.

```js
const roboto = Roboto({
	subsets: ["latin"],
	weights: ["100", "400", "700"],
});
```

#### 2.5 Subsets of font variable

Font subsets are specific parts of a font that contain only the characters necessary for a particular language or group of languages. Common subsets include:

-   latin: Basic Latin characters.
-   latin-ext: Extended Latin characters.
-   cyrillic: Cyrillic characters.
-   cyrillic-ext: Extended Cyrillic characters.
-   greek: Greek characters.
-   greek-ext: Extended Greek characters.
-   vietnamese: Vietnamese characters.

Using subsets can significantly reduce the size of the font files that need to be downloaded, leading to faster page loads and better performance, especially for multilingual websites. Loading only the necessary subsets ensures that users get the best experience without unnecessary delays.

#### 2.6 Using font in your platform

First you need to create folder `/src/components`, after that create file `font.ts` in this folder to manage your font in your project.

In `font.ts` you will define and declare variable of your font in your platform

```js
import { Manrope, Roboto } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export { manrope, roboto };
```

After that, to use these variable in your platform, you need to defined which font use in `layout.tsx` in the body tag.

```js
return (
	<html lang="en">
		<body className={`${manrope.className} ${roboto.className} `}>
			{children}
		</body>
	</html>
);
```

In this you can see that it import from the `font.ts` file to use in the `layout.tsx`

```js
import { manrope, roboto } from "@/components/font";
```

You can see the direction is begin with `@` and it look to very simple and easy to manage. It is the config in the `tsconfig.json` file in the attribute `path`

```json
"paths": {
	"@/*": ["./src/*"]
}
```

In your file layout and content of website, to define which font you want to use for each html tag and component you will define in attribute `className` in the tag

In `page.tsx` you can use font Roboto instead of default font you define in layout.tsx

```tsx
export default function Home() {
	return (
		<main>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
			earum, eos veritatis laborum rerum iste ea ullam nesciunt,
			distinctio dolorum animi, doloribus provident accusamus hic. Minus
			nisi laudantium asperiores ex!
			<h1 className={`${roboto.className}`}>
				This is an heading of the website
			</h1>
		</main>
	);
}
```

However, with this way it is not convenient when you need to use many font and want to have the default font for this page you need to defined `className` in each tag it will take a lot of time to do it. So we have another way by use attribute `variable: --font-name` when declare font in the `fonts.ts` to use in css style.

```ts
import { Manrope, Roboto } from "next/font/google";
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const roboto = Roboto({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	variable: "--font-roboto",
});
export { manrope, roboto };
```

Now when you want to use these font in tag, you need to declare variable in the `layout.tsx` by this way below

```tsx
return (
	<html lang="en">
		<body className={`${manrope.variable} ${roboto.variable}`}>
			{children}
		</body>
	</html>
);
```

After declare which font we want to use in the project in `layout.tsx` you can use in the another layout and another content by use css style in `.css` file

In `global.css` you can use font family like below

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
	font-family: var(--font-manrope);
}

h1,
h2,
h3,
h4,
h5,
h6 {
	font-family: var(--font-roboto);
}
```
