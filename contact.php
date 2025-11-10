<?php
// Laad PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Laad geheime gegevens
require_once 'config.php';  // Zorg dat dit pad klopt!

// Laad PHPMailer classes
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Formulier velden veilig maken
    $senderName    = htmlspecialchars(trim($_POST['name'] ?? ''));
    $senderEmail   = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
    $senderMessage = nl2br(htmlspecialchars(trim($_POST['message'] ?? '')));

    if (!$senderEmail || empty($senderName) || empty($senderMessage)) {
        die("Vul alle velden correct in.");
    }

    $receiverMail = "info@geitzklussenbedrijf.nl";

    $mail = new PHPMailer(true);

    try {
        // === SMTP instellingen via config.php ===
        $mail->isSMTP();
        $mail->Host       = SMTP_HOST;
        $mail->SMTPAuth   = true;
        $mail->Username   = SMTP_USER;
        $mail->Password   = SMTP_PASS;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;  // i.p.v. STARTTLS
        $mail->Port       = SMTP_PORT;
        $mail->CharSet    = 'UTF-8';

        // Debug (verwijder dit later als het werkt!)
        // $mail->SMTPDebug = SMTP::DEBUG_SERVER;
        // $mail->Debugoutput = function($str, $level) { error_log("SMTP $level: $str"); };

        // Wie stuurt het?
        $mail->setFrom(SMTP_USER, 'Geitz Klussenbedrijf');
        $mail->addAddress($receiverMail);
        $mail->addReplyTo($senderEmail, $senderName);

        // E-mail naar jou
        $mail->isHTML(true);
        $mail->Subject = "Nieuw bericht van $senderName via website";
        $mail->Body    = "
            <h3>Nieuw contactformulier!</h3>
            <p><strong>Naam:</strong> $senderName</p>
            <p><strong>E-mail:</strong> <a href='mailto:$senderEmail'>$senderEmail</a></p>
            <p><strong>Bericht:</strong><br>$senderMessage</p>
            <hr>
            <small>Verzonden op " . date('d-m-Y H:i') . " via geitzklussenbedrijf.nl</small>
        ";

        $mail->send();

        // Automatische kopie naar de klant
        $mail->clearAddresses();
        $mail->addAddress($senderEmail, $senderName);
        $mail->Subject = "Bedankt voor je bericht aan Geitz Klussenbedrijf";
        $mail->Body    = "
            <p>Beste $senderName,</p>
            <p>Bedankt voor je bericht! Hieronder een kopie:</p>
            <blockquote>$senderMessage</blockquote>
            <hr>
            <p>Ik reageer zo snel mogelijk – uiterlijk binnen 1-2 werkdagen.</p>
            <p>Met vriendelijke groet,<br>
            <strong>Marc Geitz</strong><br>
            Geitz Klussenbedrijf<br>
            <a href='https://www.geitzklussenbedrijf.nl'>www.geitzklussenbedrijf.nl</a></p>
            <p>&nbsp;</p>
            <img src='https://www.geitzklussenbedrijf.nl/assets/logos/logo.avif' alt='Geitz Klussenbedrijf' width='300'>
        ";

        $mail->send();

        // Succes → bedankpagina
        header("Location: /bericht-ontvangen/");
        exit();

    } catch (Exception $e) {
        // Fout loggen (zie je in Hostinger → Logs)
        error_log("PHPMailer fout: " . $mail->ErrorInfo);
        error_log("Gebruikte SMTP: " . SMTP_USER . "@" . SMTP_HOST);

        // Vriendelijke foutmelding voor bezoeker
        die("Er is een tijdelijke storing. Probeer later opnieuw of bel direct: 06-XXXXXXX.");
    }
}
?>