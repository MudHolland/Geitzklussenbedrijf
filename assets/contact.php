<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Sender data
    $senderName = htmlspecialchars(trim($_POST['name']));
    $senderEmail = filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL);
    $senderMessage = htmlspecialchars(trim($_POST['message']));

    if (!$senderEmail) {
        die("Ongeldig e-mailadres. Probeer het opnieuw.");
    }

    // Receiver data
    $receiverMail = "info@geitzklussenbedrijf.nl";

    // Email to receiver
    $to = $receiverMail;
    $subject = "Bericht van $senderName ontvangen via de website";
    $body = "
        <html>
        <head><meta charset='UTF-8'></head>
        <body>
            <p>Dit is een kopie van een formulier dat via <a href='https://www.geitzklussenbedrijf.nl'>www.geitzklussenbedrijf.nl</a> is verstuurd.</p>
            <p><b>Naam:</b> $senderName</p>
            <p><b>E-mailadres:</b> $senderEmail</p>
            <p><b>Bericht:</b><br>$senderMessage</p>
            <p>De website communiceert <b>binnen 1 á 2 werkdagen</b> te antwoorden.</p>
        </body>
        </html>
    ";

    $headers = "From: $receiverMail\r\n";
    $headers .= "Reply-To: $senderEmail\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    $mailSuccess = mail($to, $subject, $body, $headers);

    if ($mailSuccess) {
        // Send a copy to the sender
        $logoUrl = "https://www.geitzklussenbedrijf.nl/assets/logos/logo.avif";
        $subject_copy = "Kopie van uw bericht aan Geitz Klussenbedrijf";
        $body_copy = "
        <html>
        <head><meta charset='UTF-8'></head>
        <body>
            <p><i>Dit is een kopie van een formulier dat u via <a href='https://www.geitzklussenbedrijf.nl'>www.geitzklussenbedrijf.nl</a> heeft verstuurd.</i></p>
            <p><b>Naam:</b> $senderName</p>
            <p><b>E-mailadres:</b> $senderEmail</p>
            <p><b>Bericht:</b><br>$senderMessage</p>
            <p>-------------------------------------------------------------------</p>
            <p>Bedankt voor je bericht. Ik streef ernaar om binnen 1 á 2 werkdagen te antwoorden.</p>
            <p>Met vriendelijke groet,</p>
            <p>Marc Geitz<br>Geitz Klussenbedrijf</p>
            <p></p>
            <p><img src='$logoUrl' alt='Geitz Klussenbedrijf' width='300'></p>
        </body>
        </html>
        ";

        $headers_copy = "From: $receiverMail\r\n";
        $headers_copy .= "Reply-To: $receiverMail\r\n";
        $headers_copy .= "MIME-Version: 1.0\r\n";
        $headers_copy .= "Content-Type: text/html; charset=UTF-8\r\n";

        mail($senderEmail, $subject_copy, $body_copy, $headers_copy);

        // Redirect to thank-you page
        header("Location: /bericht-ontvangen/");
        exit();
    } else {
        die("Er is een fout opgetreden bij het verzenden van uw bericht. Probeer het later opnieuw.");
    }
}
?>
