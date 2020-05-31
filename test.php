$url = 'http://en.example.com';

$parsedUrl = parse_url($url);

$host = explode('.', $parsedUrl['host']);

$subdomain = $host[0];
echo $subdomain;