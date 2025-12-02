
export async function GET() {
    const baseUrl = 'https://pichulikstudios.co.za';

    const staticPaths = [
        '/',
        '/for-business/about',
        '/for-business/our-work',
        '/for-business/quotation',
        '/for-business/contact',
        '/for-personal/about',
        '/for-personal/services',
        '/for-personal/wedding-enquiry',
        '/for-personal/contact',
        '/for-personal/our-work',
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPaths
        .map((path) => {
            return `
        <url>
            <loc>${baseUrl}${path}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
        </url>
            `;
        })
        .join('')}
</urlset>`;

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
