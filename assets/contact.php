<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  //sender data
  $senderName = htmlspecialchars(trim($_POST['name']));
  $senderEmail = filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL);
  $senderMessage = htmlspecialchars(trim($_POST['message']));

  // receiver data
  $receiverMail = "info@geitzklussenbedrijf.nl";

  // email to receiver
  $to = "$receiverMail";                           
  $subject = "Bericht via de website van $senderName";
  $body = "Naam: $senderName\nE-mail: $senderEmail\n\nBericht:\n$senderMessage";
  
  // email to sender
  $headers = "From: $receiverMail\r\n";
  $headers .= "Reply-To: $receiverMail\r\n";
  $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

  $mailSuccess = mail($to, $subject, $body, $headers);

  if ($mailSuccess) {
      // Send a copy to the sender
      $subject_copy = "Kopie van uw bericht aan Geitz Klussenbedrijf";
      $body_copy = "Beste $senderName,\n\nHier is een kopie van uw bericht:\n\n$senderMessage\n\nMet vriendelijke groet,\nGeitz Klussenbedrijf";
      $headers_copy = "From: $receiverMail\r\nContent-Type: text/plain; charset=UTF-8\r\n";
      mail($senderEmail, $subject_copy, $body_copy, $headers_copy);

      // Redirect to thank-you page
      header("Location: /bericht-ontvangen/");
      exit();
  } else {
      die("Er is een fout opgetreden bij het verzenden van uw bericht. Probeer het later opnieuw.");
  }
}
?>
