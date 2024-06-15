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

### 1. Metadata in NextJS Project

Metadata in a `web application refers to information` about the webpage that is not visible on the page itself but is embedded in the HTML markup. This metadata includes elements such as `title`, `description`, `keywords`, `author`, and `viewport settings`. Metadata plays a `crucial role` in `search engine optimization (SEO)`, `social sharing`, and `accessibility`.

```js
export const metadata: Metadata = {
	title: "Ucademy",
	description:
		"Explore a wide range of courses on Ucademy and enhance your skills.",
};
```

### 2. Google font in NextJS Project

#### 2.1 Import a font from Google Font

```js
import { FontName } from "next/font/google";
```

Import many font from google

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

You also can use many font variable in your `layout.tsx` by modify the body tag with many font variable in `className` tag.

```js
return (
	<html lang="en">
		<body className={`${manrope.className} ${roboto.className} `}>
			{children}
		</body>
	</html>
);
```

However, when this situation, your website will not know which font you want to use default in your website so leed to conflict in your website.

#### 2.4 Font Weight

Typography plays a crucial role in web design, affecting both aesthetics and readability. One key aspect of typography is font weight, which determines the thickness of the text.

Font weight defines the thickness of the characters in a typeface. It ranges from 100 to 900, where 100 is the thinnest and 900 is the thickest.

Some of common weights include:

- 100: Thin
- 200: Extra Light
- 300: Light
- 400: Normal (Regular)
- 500: Medium
- 600: Semi Bold
- 700: Bold
- 800: Extra Bold
- 900: Black

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

- latin: Basic Latin characters.
- latin-ext: Extended Latin characters.
- cyrillic: Cyrillic characters.
- cyrillic-ext: Extended Cyrillic characters.
- greek: Greek characters.
- greek-ext: Extended Greek characters.
- vietnamese: Vietnamese characters.

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

You can see the location of import is begin with `@` and it look to very simple and easy to manage. It is the config in the `tsconfig.json` file in the attribute `path`

```json
"paths": {"@/*": ["./src/*"]
}
```

In your file layout and content of website, to define which font you want to use for each html tag and component you will define in attribute `className` in the tag

In `page.tsx` you can use font Roboto instead of default font you define in layout.tsx

```tsx
export default function Home() {
	return (
		<main>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
			earum, eos veritatis laborum rerum iste ea ullam nesciunt, distinctio
			dolorum animi, doloribus provident accusamus hic. Minus nisi laudantium
			asperiores ex!
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
		<body className={`${manrope.variable} ${roboto.variable}`}>{children}</body>
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

### 3. Tailwind Font in NextJS Project

#### 3.1 Import a font for Tailwind

Open the file `tailwind.config.ts` to modify the font in the tailwind config, first you need to clear the default config in the tag `extend`

```ts
theme: {
	extend: {},
},
```

Now we will change the font of the tailwind by add the tag fontFamily and choose the primary and secondary font for the project.

```ts
theme: {
	extend: {
		fontFamily: {
			primary: ["var(--font-manrope)"],
			secondary: ["var(--font-roboto)"],
		},
	},
},
```

#### 3.2 Using font in Tailwind CSS

Now we can use in the body and tag HTML with font by tailwind syntax like the code below, we will set the font of the body tag is font-primary in the config of tailwind config.

```tsx
return (
	<html lang="en">
		<body className={`${manrope.variable} ${roboto.variable} font-primary`}>
			{children}
		</body>
	</html>
);
```

If you want to set the another font by tailwind with the tag you can use the syntax html like below in `page.tsx`, it set the font of h1 use the font-secondary in the config of tailwind.

The paragraph is use the font of the body in `layout.tsx` and the `h1` is use the custom font in `className` tag with the `secondary font` of the tailwind config.

```tsx
return (
	<main>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae earum,
		eos veritatis laborum rerum iste ea ullam nesciunt, distinctio dolorum
		animi, doloribus provident accusamus hic. Minus nisi laudantium asperiores
		ex!
		<h1 className="font-secondary">This is an heading of the website</h1>
	</main>
);
```

### 4. Using the local font in project

First you need to have the font file with the type of file is `.tff`. After that, you will copy it into the folder `./src/app` to use the local font.

Now go to the folder `src/components/` and open the file `font.ts` to modify using the local font of the project.

First you need import the library to use the local font

```ts
import localFont from "next/font/local";
```

Now we will declare the variable for the local font by the code below

```ts
const dm_sans = localFont({
	src: "../app/DMSans-Regular.ttf",
	display: "swap",
});
export { manrope, roboto, dm_sans };
```

You need to setup to use in your project of the body tag in the `layout.tsx` file to set up for the body of the layout project.

```tsx
return (
	<html lang="en">
		<body className={dm_sans.className}>{children}</body>
	</html>
);
```

But we have many font weight for the local font, so we need to modify the declare the variable of local font in the `src/components/font.ts`

```js
const dm_sans = localFont({
	src: [
		{
			path: "../app/DMSans-Regular.ttf",
			weight: "400",
		},
		{
			path: "../app/DMSans-Meidum.ttf",
			weight: "500",
		},
		{
			path: "../app/DMSans-Bold.ttf",
			weight: "700",
		},
		{
			path: "../app/DMSans-Italic.ttf",
			weight: "400",
			style: "italic",
		},
	],
	display: "swap",
});
```

Now when we use, we will use in the attribute of the tag we want to modify font use with weight and italic or not like the code below in the file `src/app/page.tsx`

```js
return (
	<main>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae earum,
		eos veritatis laborum rerum iste ea ullam nesciunt, distinctio dolorum
		animi, doloribus provident accusamus hic. Minus nisi laudantium asperiores
		ex!
		<h1 className="font-secondary font-medium">
			This is an heading of the website
		</h1>
	</main>
);
```

However, we usually use font in the `layout.tsx` so when we loading any page, it will load all font, it will make the page is loading too slow. So follow by the `NextJs` the best practice is we will create a different file to export font like `font.ts` and when we use in page, we will import to make the page loading more better.

### 5. Next/Link concept in NextJS Project

In Next.js, the concept of `routing` and `navigation` is handled using the `Link` component from the `next/link` module. This component provides client-side navigation between pages in your Next.js application, ensuring fast transitions without full page reloads.

Some of props we usually use in `Link` tag which is have the function to working alternative `a` tag in HTML

**Good to know:**: `<a>` tag attributes such as className or `target="\_blank"` can be added to `<Link>` as props and will be passed to the underlying a element.

**`href`**: This prop is `required` use to specifies the URL or path the link should navigate to within your Next.js application.expand_more. It's essential for defining the target of the link. You can use absolute paths (starting with a slash /) for internal routes or relative paths for linking within the same directory. The value of it can be `url path`, `object` or `string`.

We can use an object like the code below, or use string like `href={`${url}?page=1`}`. However, the path with query, Nextjs recommend we write like an object. If the path without query you can write in type of string.

```tsx
<Link
	href={url}
	className="p-3 rounded-md flex items-center gap-3 hover:text-primary hover:bg-primary hover:bg-opacity-10 transition-all"
>
```

**`replace`**: Defaults to false. This is an boolean props with two value `true` and `false`. By default, clicking a Link performs a normal client-side navigation, pushing a new history entry. Setting replace to `true` replaces the current entry in the history stack instead, creating a "one-way" navigation. It means, if `false`, it will `store the history`, if `true` it `replace the url path without save history`.

**`scroll`**: Defaults to true. The default behavior of `<Link>` is to scroll to the top of a new route or to maintain the scroll position for backwards and forwards navigation. When `false`, next/link will not `scroll to the top of the page after a navigation.`

**`prefetch`**: Prefetching happens when a `<Link />` component enters the user's viewport (initially or through scroll). Next.js prefetches and loads the linked route (denoted by the href) and data in the background to improve the performance of client-side navigations.

**Prefetching** is only enabled in production. Here are some value of `prefetching`

- true (default): The full route and its data will be prefetched.

- false: Prefetching will not happen when entering the viewport, but will happen on hover. If you want to completely remove fetching on hover as well, consider using an `a` tag or incrementally adopting the App Router, which enables disabling prefetching on hover too.

It only working in environment production. It means only working when you deploy into the website and server.

When the static page with url path display in viewport, the `Link` with the attribute `Prefetching` will be loads the `linked route (denoted by the href)` and data in the background to improve the performance of client-side navigations.
When the static page with url path display in viewport, the `Link` with the attribute `Prefetching` will be loads the `linked route (denoted by the href)` and data in the background to improve the performance of client-side navigations.

### 6. Some of hook important in NextJS

**[usePathname()](https://nextjs.org/docs/app/api-reference/functions/use-pathname)**: It use to access the current pathname of the URL. This can be particularly useful for scenarios where you need to conditionally render components or apply logic based on the current route.

### 7. Error Best Practice

You're importing a component that needs `usePathname`. It only works in a Client Component but none of its parents are marked with "use client", so they're Server Components by default.

This is an error that the component use hook `usePathname` of nextjs is only run at the environment Client so you need to declare `"use client"` in the head of the file.
