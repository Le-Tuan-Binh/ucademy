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

## Some of the attribute in NextJs Project

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

#### 2.2 Create a variable of this forn

```js
const variable = FontName({ subsets: ["latin"] });
```

#### 2.3 Using font variable in the body of the website

In the layout.tsx, we can use the font variable in the `body` tag with attribute `className` is `{FontName.className}`

```js
return (
	<html lang="en">
		<body className={FontName.className}>{children}</body>
	</html>
);
```
