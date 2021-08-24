<?php

require_once('FormProcessor.php');

$form = array(
    'subject' => 'BodhahFoundation',
    'email_message' => 'You have successfully subcribed to BhodhaFoundation. You will recieve Email monthly on our updates.
Thank you for subscribing.',
    'success_redirect' => '',
    'sendIpAddress' => true,
    'email' => array(
    'from' => 'bodhahfoundation@gmail.com',
    'to' => 'email-1'
    ),
    'fields' => array(
    'email-1' => array(
    'order' => 1,
    'type' => 'email',
    'label' => 'email-1',
    'required' => true,
    'errors' => array(
    'required' => 'Field \'email-1\' is required.'
    )
    ),
    )
    );

    $processor = new FormProcessor('');
    $processor->process($form);

    ?>