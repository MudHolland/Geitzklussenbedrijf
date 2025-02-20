<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = htmlspecialchars($_POST['name']);
  $email = htmlspecialchars($_POST['email']);
  $message = htmlspecialchars($_POST['message']);

  $to = "dennisulijn@gmail.com";
  $subject = "Nieuw bericht van $name";
  $body = "Naam: $name\nE-mail: $email\n\nBericht:\n$message";
  $headers = "From: $email\r\n";
  $headers .= "Reply-To: $email\r\n";

  // Send email to Geitz Klussenbedrijf
  mail($to, $subject, $body, $headers);

  // Send copy to sender
  $subject_copy = "Kopie van uw bericht aan Geitz Klussenbedrijf";
  $body_copy = "Beste $name,\n\nHier is een kopie van uw bericht:\n\n$message\n\nMet vriendelijke groet,\nGeitz Klussenbedrijf";
  mail($email, $subject_copy, $body_copy, "From: dennisulijn@gmail.com\r\n");

  // Redirect to a thank you page (optional)
  header("Location: thank-you.html");
  exit();
}
?>
