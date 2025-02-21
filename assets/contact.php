<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $name = htmlspecialchars(trim($_POST['name']));
  $email = filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL);
  $message = htmlspecialchars(trim($_POST['message']));

  if (!$email) {
    die("Ongeldig e-mailadres. Probeer het opnieuw.");
  }

  $to = "dennisulijn@gmail.com";
  $subject = "Nieuw bericht van $name";
  $body = "Naam: $name\nE-mail: $email\n\nBericht:\n$message";
  $headers = "From: $email\r\n";
  $headers .= "Reply-To: $email\r\n";

  $headers = "From: info@geitzklussenbedrijf.nl\r\n";
  $headers .= "Reply-To: $email\r\n";
  $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

  $to = "dennisulijn@gmail.com";
  $subject = "Nieuw bericht van $name";
  $body = "Naam: $name\nE-mail: $email\n\nBericht:\n$message";
  $headers = "From: $email\r\n";
  $headers .= "Reply-To: $email\r\n";

  // Send email and check for success
  $mailSuccess = mail($to, $subject, $body, $headers);

  if ($mailSuccess) {
      // Send copy to sender
      $subject_copy = "Kopie van uw bericht aan Geitz Klussenbedrijf";
      $body_copy = "Beste $name,\n\nHier is een kopie van uw bericht:\n\n$message\n\nMet vriendelijke groet,\nGeitz Klussenbedrijf";

      mail($email, $subject_copy, $body_copy, "From: info@geitzklussenbedrijf.nl\r\nContent-Type: text/plain; charset=UTF-8\r\n");

      // Redirect to thank-you page
      header("Location: /bericht-ontvangen/");
      exit();
  } else {
      die("Er is een fout opgetreden bij het verzenden van uw bericht. Probeer het later opnieuw.");
  }
}
?>