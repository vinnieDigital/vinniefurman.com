<?php
    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
		$receiverEmail = $_POST['receiverEmail'];
		$senderEmail = $_POST['senderEmail'];
		$senderName = $_POST['senderName'];
		$subject = $_POST['subject'];
		$message = $_POST['message'];
		
		
	
        // Check that data was sent to the mailer.
        if ( empty($senderEmail) OR !filter_var($senderEmail, FILTER_VALIDATE_EMAIL)) {
            // Set a 400 (bad request) response code and exit.
            http_response_code(400);
            echo "Oops! There was a problem with your submission. Please complete the form and try again.";
            exit;
        }
        
        $to = $receiverEmail;

		$subject = "New Form Message From " .$senderName. ":" . $subject;

		$headers = "From: " . $senderEmail . "\r\n";
		$headers .= "MIME-Version: 1.0\r\n";
		$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
		$body = $message;
		
        // Send the email.
        if (mail($to, $subject, $body, $headers)) {
            // Set a 200 (okay) response code.
            // http_response_code(200);
            echo "Thank You! An email has been sent to the address you provided.";
        } else {
            // Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "Oops! Something went wrong and we couldn't send your message.";
        }

    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "There was a problem with your submission, please try again.";
    }

?>