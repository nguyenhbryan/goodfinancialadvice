
export default function MyApp({ Component, pageProps }) {
    return (
        <html>
            <body>
                <div>
                    <Component {...pageProps} />
                </div>
            </body>
        </html>
    );
}
