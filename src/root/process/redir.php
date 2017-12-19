<?php
// requested URL
$addr = strtolower($_SERVER['REQUEST_URI']);
$url = '';

// redirects
$redir = array(

	'index' => '',
	'welcome' => '',
	'home' => '',
	'tag' => 'article/',
	'blog' => 'article/',
	'access' => 'about/accessibility/',
	'privacy' => 'about/privacy/',
	'about' => 'about/',
	'portfolio' => 'service/',
	'serv' => 'service/',
	'consult' => 'service/consultancy/',
	'dev' => 'service/development/',
	'train' => 'service/knowledge/',
	'contact' => 'contact/',
	'mail' => 'contact/',
	'tel' => 'contact/'

);
foreach ($redir as $pold => $pnew) if (strpos($addr, $pold) !== false) $url = '/* @echo rootURL */' . $pnew;

if ($url !== '') {

	// redirect found
	header('HTTP/1.1 301 Moved Permanently');
	header('Location: ' . $url);

}
else {

	// show error page
	$eurl = '/* @echo rootURL */error/';

	$fcont = file_get_contents($eurl);
	if ($fcont !== false) {
		header('HTTP/1.0 404 Not Found');
		echo $fcont;
	}
	else header('Location: ' . $eurl);

}
