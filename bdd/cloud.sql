-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Ven 31 Octobre 2014 à 17:36
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

-- --------------------------------------------------------

--
-- Structure de la table `acces`
--

CREATE TABLE IF NOT EXISTS `acces` (
  `usersgroupsid` int(20) NOT NULL,
  `filesgroupsid` int(20) NOT NULL,
  `write` tinyint(1) NOT NULL,
  PRIMARY KEY (`usersgroupsid`,`filesgroupsid`),
  KEY `Id_files_groupes` (`filesgroupsid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `files`
--

CREATE TABLE IF NOT EXISTS `files` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `path` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `type` varchar(20) NOT NULL,
  `owner` varchar(11) NOT NULL,
  `pubDate` date NOT NULL,
  `tags` varchar(20) NOT NULL,
  `groupid` int(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Id_files_groups` (`groupid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `filesgroups`
--

CREATE TABLE IF NOT EXISTS `filesgroups` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `groupid` int(20) NOT NULL,
  `name` varchar(11) NOT NULL,
  `password` varchar(11) NOT NULL,
  `email` varchar(11) NOT NULL,
  `subscriptiondate` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Id_groupe` (`groupid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `groupid`, `name`, `password`, `email`, `subscriptiondate`) VALUES
(1, 0, 'root', 'access', 'rootaccess@', '2014-10-27');

-- --------------------------------------------------------

--
-- Structure de la table `usersgroups`
--

CREATE TABLE IF NOT EXISTS `usersgroups` (
  `id` int(20) NOT NULL,
  `title` varchar(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `usersgroups`
--

INSERT INTO `usersgroups` (`id`, `title`) VALUES
(0, 'home'),
(1, 'work');

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `acces`
--
ALTER TABLE `acces`
  ADD CONSTRAINT `acces_ibfk_2` FOREIGN KEY (`filesgroupsid`) REFERENCES `filesgroups` (`id`),
  ADD CONSTRAINT `acces_ibfk_1` FOREIGN KEY (`usersgroupsid`) REFERENCES `usersgroups` (`id`);

--
-- Contraintes pour la table `files`
--
ALTER TABLE `files`
  ADD CONSTRAINT `files_ibfk_1` FOREIGN KEY (`groupid`) REFERENCES `filesgroups` (`id`);

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`groupid`) REFERENCES `usersgroups` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
