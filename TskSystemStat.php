<?php
/**
 * @author : Tharanga Kothalawala <tharanga.kothalawala@tsk-webdevelopment.com>
 * @date   : 17-01-2017
 *
 * just to output various stats of a server. btw I am aware of Nagios ;)
 */

class TskSystemStat
{
    /**
     * @return string
     */
    public function vmstatForks()
    {
        return exec("vmstat -f | awk '{print $1}'");
    }
}

$tskSystemStat = new TskSystemStat();

$response = array(
    'vmstat' => array(
        'forks' => $tskSystemStat->vmstatForks(),
    ),
);

header('Content-Type: application/json');
echo json_encode($response);
