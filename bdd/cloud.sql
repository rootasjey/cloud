-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Lun 15 Décembre 2014 à 12:39
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `cloud`
--

DELIMITER $$
--
-- Procédures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `creer_groupe_utilisateur`(IN `p_nom_groupe` VARCHAR(50))
    SQL SECURITY INVOKER
BEGIN
						INSERT INTO usersgroups(title)
						VALUES(`p_nom_groupe`);
						SET @user = p_nom_groupe;
						SET @q1 = CONCAT('GRANT USAGE ON cloud.* TO ', @p_nom_groupe, "@'localhost' IDENTIFIED BY 'pass'");
						PREPARE stmt FROM @q1;
						EXECUTE stmt;
						DEALLOCATE PREPARE stmt;
						-- SELECT id FROM usersgroups WHERE title=p_nom_groupe;
					END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_usergroup`(IN `p_usergroup_id` INT)
BEGIN
	SET @title = NULL;
    SELECT title INTO @title 
    FROM cloud.usersgroups WHERE id = p_usergroup_id;
    
	DELETE FROM cloud.usersgroups 
    WHERE id = p_usergroup_id;
    
    DELETE FROM mysql.tables_priv
    WHERE user = @title;
    
    DELETE FROM mysql.user
    WHERE user = @title;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_acess`(IN `p_usergroup_id` INT(50), OUT `p_user` VARCHAR(50))
    SQL SECURITY INVOKER
BEGIN
	SELECT user INTO p_user
	FROM mysql.user u
	WHERE u.user = (SELECT title
					FROM usersgroups
					WHERE id = p_usergroup_id);
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `access`
--

CREATE TABLE IF NOT EXISTS `access` (
  `usersgroupsid` int(20) NOT NULL,
  `filesgroupsid` int(20) NOT NULL,
  `write` int(10) NOT NULL,
  KEY `usersgroupsid` (`usersgroupsid`),
  KEY `filesgroupsid` (`filesgroupsid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `access`
--

INSERT INTO `access` (`usersgroupsid`, `filesgroupsid`, `write`) VALUES
(61, 72, 0),
(62, 72, 0),
(61, 70, 0),
(61, 70, 0),
(61, 70, 0),
(61, 72, 0),
(61, 73, 0),
(61, 72, 0),
(61, 73, 0),
(61, 70, 0),
(61, 70, 0),
(61, 73, 0),
(61, 72, 0);

-- --------------------------------------------------------

--
-- Structure de la table `files`
--

CREATE TABLE IF NOT EXISTS `files` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `groupid` int(30) NOT NULL,
  `owner` varchar(30) NOT NULL,
  `path` varchar(300) NOT NULL,
  `name` varchar(50) NOT NULL,
  `type` varchar(20) NOT NULL,
  `pubDate` date NOT NULL,
  `tags` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `groupid` (`groupid`),
  KEY `owner` (`owner`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=60 ;

--
-- Contenu de la table `files`
--

INSERT INTO `files` (`id`, `groupid`, `owner`, `path`, `name`, `type`, `pubDate`, `tags`) VALUES
(58, 72, 'kygo', 'local/local', 'hiver00', 'other', '2014-12-15', 'hiver, glacial'),
(59, 72, 'kygo', 'AC_0X42F', 'some_text2', 'text', '2014-12-15', 'banks,electro');

-- --------------------------------------------------------

--
-- Structure de la table `filesgroups`
--

CREATE TABLE IF NOT EXISTS `filesgroups` (
  `id` int(30) NOT NULL AUTO_INCREMENT,
  `title` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=74 ;

--
-- Contenu de la table `filesgroups`
--

INSERT INTO `filesgroups` (`id`, `title`) VALUES
(70, 'Musique_oldchool'),
(72, 'Hiver_2014'),
(73, 'Transistor');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(30) NOT NULL AUTO_INCREMENT,
  `groupid` int(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `subscriptiondate` date NOT NULL,
  `avatar` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `groupid` (`groupid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=21 ;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `groupid`, `name`, `password`, `email`, `subscriptiondate`, `avatar`) VALUES
(20, 61, 'kygo', 'kygo', 'kygo@mail.com', '2014-12-15', '');

-- --------------------------------------------------------

--
-- Structure de la table `usersgroups`
--

CREATE TABLE IF NOT EXISTS `usersgroups` (
  `id` int(30) NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=63 ;

--
-- Contenu de la table `usersgroups`
--

INSERT INTO `usersgroups` (`id`, `title`) VALUES
(61, 'NouvelleGen'),
(62, 'NextGen');

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `v_hiver_2014`
--
CREATE TABLE IF NOT EXISTS `v_hiver_2014` (
`id` int(20)
,`groupid` int(30)
,`owner` varchar(30)
,`path` varchar(300)
,`name` varchar(50)
,`type` varchar(20)
,`pubDate` date
,`tags` varchar(50)
);
-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `v_transistor`
--
CREATE TABLE IF NOT EXISTS `v_transistor` (
`id` int(20)
,`groupid` int(30)
,`owner` varchar(30)
,`path` varchar(300)
,`name` varchar(50)
,`type` varchar(20)
,`pubDate` date
,`tags` varchar(50)
);
-- --------------------------------------------------------

--
-- Structure de la vue `v_hiver_2014`
--
DROP TABLE IF EXISTS `v_hiver_2014`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_hiver_2014` AS select `files`.`id` AS `id`,`files`.`groupid` AS `groupid`,`files`.`owner` AS `owner`,`files`.`path` AS `path`,`files`.`name` AS `name`,`files`.`type` AS `type`,`files`.`pubDate` AS `pubDate`,`files`.`tags` AS `tags` from `files` where (`files`.`groupid` = 72);

-- --------------------------------------------------------

--
-- Structure de la vue `v_transistor`
--
DROP TABLE IF EXISTS `v_transistor`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_transistor` AS select `files`.`id` AS `id`,`files`.`groupid` AS `groupid`,`files`.`owner` AS `owner`,`files`.`path` AS `path`,`files`.`name` AS `name`,`files`.`type` AS `type`,`files`.`pubDate` AS `pubDate`,`files`.`tags` AS `tags` from `files` where (`files`.`groupid` = 73);

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `access`
--
ALTER TABLE `access`
  ADD CONSTRAINT `access_ibfk_1` FOREIGN KEY (`usersgroupsid`) REFERENCES `usersgroups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `access_ibfk_2` FOREIGN KEY (`filesgroupsid`) REFERENCES `filesgroups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `files`
--
ALTER TABLE `files`
  ADD CONSTRAINT `files_ibfk_1` FOREIGN KEY (`groupid`) REFERENCES `filesgroups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `files_ibfk_2` FOREIGN KEY (`owner`) REFERENCES `users` (`name`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`groupid`) REFERENCES `usersgroups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
