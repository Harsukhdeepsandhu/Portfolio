<?php
   $mail = new PHPMailer(); // create a new object
   $mail->IsSMTP(); // enable SMTP
   $mail->SMTPDebug = 1; // debugging: 1 = errors and messages, 2 = messages only
   $mail->SMTPAuth = true; // authentication enabled
   $mail->SMTPSecure = "ssl"; // secure transfer enabled REQUIRED for Gmail
   $mail->Host = "smtp.gmail.com";
   $mail->Port = 465; // or 587
   $mail->IsHTML(true);
   $mail->Username = "";
   $mail->Password = "";
   $mail->SetFrom($_POST['email'], $_POST['name']);
   $mail->Subject = $_POST['subject'];
   $mail->Body = $_POST['body'];
   $mail->AddAddress("");

   if(!$mail->Send()) {
      echo "Mailer Error: " . $mail->ErrorInfo;
   } else {
      echo "Message has been sent";
   }
 ?>