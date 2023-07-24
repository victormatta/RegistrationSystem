<?php

namespace App\Model;

class Connection
{
    private static $instace;

    public static function getConn()
    {
        if (!isset(self::$instace)):
            self::$instace = new \PDO("mysql:host=localhost;dbname=registration_system;charset=utf8", "root", "");
        endif;

        return self::$instace;
    }
}

?>