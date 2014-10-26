-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le: Dim 26 Octobre 2014 à 08:18
-- Version du serveur: 5.6.12-log
-- Version de PHP: 5.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `cloud`
--
CREATE DATABASE IF NOT EXISTS `cloud` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `cloud`;

-- --------------------------------------------------------

--
-- Structure de la table `acces`
--

CREATE TABLE IF NOT EXISTS `acces` (
  `Id_users_groups` int(20) NOT NULL,
  `Id_files_groupes` int(20) NOT NULL,
  `ecriture` varchar(20) NOT NULL,
  PRIMARY KEY (`Id_users_groups`,`Id_files_groupes`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `files`
--

CREATE TABLE IF NOT EXISTS `files` (
  `Id_files` int(20) NOT NULL,
  `Path` varchar(50) NOT NULL,
  `Nom` varchar(50) NOT NULL,
  `Type` varchar(20) NOT NULL,
  `Auteur` varchar(11) NOT NULL,
  `Date_publication` date NOT NULL,
  `Tags_description` varchar(20) NOT NULL,
  `Tags_controle_acces` varchar(20) NOT NULL,
  `Id_files_groups` int(20) NOT NULL,
  PRIMARY KEY (`Id_files`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `filesgroups`
--

CREATE TABLE IF NOT EXISTS `filesgroups` (
  `Id_files_groupes` int(20) NOT NULL,
  `Nom` varchar(11) NOT NULL,
  PRIMARY KEY (`Id_files_groupes`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `Id_user` int(20) NOT NULL,
  `Id_groupe` int(20) NOT NULL,
  `Nom_user` varchar(11) NOT NULL,
  `Prenom_user` varchar(11) NOT NULL,
  `Mail_user` varchar(11) NOT NULL,
  `Date_inscription_user` date NOT NULL,
  PRIMARY KEY (`Id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `usersgroups`
--

CREATE TABLE IF NOT EXISTS `usersgroups` (
  `Id_groupe` int(20) NOT NULL,
  `Alias` varchar(11) NOT NULL,
  PRIMARY KEY (`Id_groupe`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
