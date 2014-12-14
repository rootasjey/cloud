<?php

use Symfony\Component\Routing\Exception\MethodNotAllowedException;
use Symfony\Component\Routing\Exception\ResourceNotFoundException;
use Symfony\Component\Routing\RequestContext;

/**
 * appDevUrlMatcher
 *
 * This class has been auto-generated
 * by the Symfony Routing Component.
 */
class appDevUrlMatcher extends Symfony\Bundle\FrameworkBundle\Routing\RedirectableUrlMatcher
{
    /**
     * Constructor.
     */
    public function __construct(RequestContext $context)
    {
        $this->context = $context;
    }

    public function match($pathinfo)
    {
        $allow = array();
        $pathinfo = rawurldecode($pathinfo);
        $context = $this->context;
        $request = $this->request;

        if (0 === strpos($pathinfo, '/_')) {
            // _wdt
            if (0 === strpos($pathinfo, '/_wdt') && preg_match('#^/_wdt/(?P<token>[^/]++)$#s', $pathinfo, $matches)) {
                return $this->mergeDefaults(array_replace($matches, array('_route' => '_wdt')), array (  '_controller' => 'web_profiler.controller.profiler:toolbarAction',));
            }

            if (0 === strpos($pathinfo, '/_profiler')) {
                // _profiler_home
                if (rtrim($pathinfo, '/') === '/_profiler') {
                    if (substr($pathinfo, -1) !== '/') {
                        return $this->redirect($pathinfo.'/', '_profiler_home');
                    }

                    return array (  '_controller' => 'web_profiler.controller.profiler:homeAction',  '_route' => '_profiler_home',);
                }

                if (0 === strpos($pathinfo, '/_profiler/search')) {
                    // _profiler_search
                    if ($pathinfo === '/_profiler/search') {
                        return array (  '_controller' => 'web_profiler.controller.profiler:searchAction',  '_route' => '_profiler_search',);
                    }

                    // _profiler_search_bar
                    if ($pathinfo === '/_profiler/search_bar') {
                        return array (  '_controller' => 'web_profiler.controller.profiler:searchBarAction',  '_route' => '_profiler_search_bar',);
                    }

                }

                // _profiler_purge
                if ($pathinfo === '/_profiler/purge') {
                    return array (  '_controller' => 'web_profiler.controller.profiler:purgeAction',  '_route' => '_profiler_purge',);
                }

                // _profiler_info
                if (0 === strpos($pathinfo, '/_profiler/info') && preg_match('#^/_profiler/info/(?P<about>[^/]++)$#s', $pathinfo, $matches)) {
                    return $this->mergeDefaults(array_replace($matches, array('_route' => '_profiler_info')), array (  '_controller' => 'web_profiler.controller.profiler:infoAction',));
                }

                // _profiler_phpinfo
                if ($pathinfo === '/_profiler/phpinfo') {
                    return array (  '_controller' => 'web_profiler.controller.profiler:phpinfoAction',  '_route' => '_profiler_phpinfo',);
                }

                // _profiler_search_results
                if (preg_match('#^/_profiler/(?P<token>[^/]++)/search/results$#s', $pathinfo, $matches)) {
                    return $this->mergeDefaults(array_replace($matches, array('_route' => '_profiler_search_results')), array (  '_controller' => 'web_profiler.controller.profiler:searchResultsAction',));
                }

                // _profiler
                if (preg_match('#^/_profiler/(?P<token>[^/]++)$#s', $pathinfo, $matches)) {
                    return $this->mergeDefaults(array_replace($matches, array('_route' => '_profiler')), array (  '_controller' => 'web_profiler.controller.profiler:panelAction',));
                }

                // _profiler_router
                if (preg_match('#^/_profiler/(?P<token>[^/]++)/router$#s', $pathinfo, $matches)) {
                    return $this->mergeDefaults(array_replace($matches, array('_route' => '_profiler_router')), array (  '_controller' => 'web_profiler.controller.router:panelAction',));
                }

                // _profiler_exception
                if (preg_match('#^/_profiler/(?P<token>[^/]++)/exception$#s', $pathinfo, $matches)) {
                    return $this->mergeDefaults(array_replace($matches, array('_route' => '_profiler_exception')), array (  '_controller' => 'web_profiler.controller.exception:showAction',));
                }

                // _profiler_exception_css
                if (preg_match('#^/_profiler/(?P<token>[^/]++)/exception\\.css$#s', $pathinfo, $matches)) {
                    return $this->mergeDefaults(array_replace($matches, array('_route' => '_profiler_exception_css')), array (  '_controller' => 'web_profiler.controller.exception:cssAction',));
                }

            }

            if (0 === strpos($pathinfo, '/_configurator')) {
                // _configurator_home
                if (rtrim($pathinfo, '/') === '/_configurator') {
                    if (substr($pathinfo, -1) !== '/') {
                        return $this->redirect($pathinfo.'/', '_configurator_home');
                    }

                    return array (  '_controller' => 'Sensio\\Bundle\\DistributionBundle\\Controller\\ConfiguratorController::checkAction',  '_route' => '_configurator_home',);
                }

                // _configurator_step
                if (0 === strpos($pathinfo, '/_configurator/step') && preg_match('#^/_configurator/step/(?P<index>[^/]++)$#s', $pathinfo, $matches)) {
                    return $this->mergeDefaults(array_replace($matches, array('_route' => '_configurator_step')), array (  '_controller' => 'Sensio\\Bundle\\DistributionBundle\\Controller\\ConfiguratorController::stepAction',));
                }

                // _configurator_final
                if ($pathinfo === '/_configurator/final') {
                    return array (  '_controller' => 'Sensio\\Bundle\\DistributionBundle\\Controller\\ConfiguratorController::finalAction',  '_route' => '_configurator_final',);
                }

            }

        }

        // p_cloud_platform_homepage
        if (rtrim($pathinfo, '/') === '') {
            if (substr($pathinfo, -1) !== '/') {
                return $this->redirect($pathinfo.'/', 'p_cloud_platform_homepage');
            }

            return array (  '_controller' => 'PCloud\\PlatformBundle\\Controller\\AdvertController::indexAction',  '_route' => 'p_cloud_platform_homepage',);
        }

        // signup
        if (rtrim($pathinfo, '/') === '/signup') {
            if (substr($pathinfo, -1) !== '/') {
                return $this->redirect($pathinfo.'/', 'signup');
            }

            return array (  '_controller' => 'PCloud\\PlatformBundle\\Controller\\AdvertController::signupAction',  '_route' => 'signup',);
        }

        // login
        if (rtrim($pathinfo, '/') === '/login') {
            if (substr($pathinfo, -1) !== '/') {
                return $this->redirect($pathinfo.'/', 'login');
            }

            return array (  '_controller' => 'PCloud\\PlatformBundle\\Controller\\AdvertController::loginAction',  '_route' => 'login',);
        }

        if (0 === strpos($pathinfo, '/view')) {
            if (0 === strpos($pathinfo, '/viewusers')) {
                // view_users
                if (rtrim($pathinfo, '/') === '/viewusers') {
                    if (substr($pathinfo, -1) !== '/') {
                        return $this->redirect($pathinfo.'/', 'view_users');
                    }

                    return array (  '_controller' => 'PCloud\\PlatformBundle\\Controller\\AdvertController::viewusersAction',  '_route' => 'view_users',);
                }

                // view_usersgroups
                if (rtrim($pathinfo, '/') === '/viewusersgroups') {
                    if (substr($pathinfo, -1) !== '/') {
                        return $this->redirect($pathinfo.'/', 'view_usersgroups');
                    }

                    return array (  '_controller' => 'PCloud\\PlatformBundle\\Controller\\AdvertController::viewusersgroupsAction',  '_route' => 'view_usersgroups',);
                }

            }

            if (0 === strpos($pathinfo, '/viewfiles')) {
                // view_files
                if (rtrim($pathinfo, '/') === '/viewfiles') {
                    if (substr($pathinfo, -1) !== '/') {
                        return $this->redirect($pathinfo.'/', 'view_files');
                    }

                    return array (  '_controller' => 'PCloud\\PlatformBundle\\Controller\\AdvertController::viewfilesAction',  '_route' => 'view_files',);
                }

                // view_filesgroups
                if (rtrim($pathinfo, '/') === '/viewfilesgroups') {
                    if (substr($pathinfo, -1) !== '/') {
                        return $this->redirect($pathinfo.'/', 'view_filesgroups');
                    }

                    return array (  '_controller' => 'PCloud\\PlatformBundle\\Controller\\AdvertController::viewfilesgroupsAction',  '_route' => 'view_filesgroups',);
                }

            }

            if (0 === strpos($pathinfo, '/viewsingle')) {
                // view_singleuser
                if (0 === strpos($pathinfo, '/viewsingleuser') && preg_match('#^/viewsingleuser/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                    return $this->mergeDefaults(array_replace($matches, array('_route' => 'view_singleuser')), array (  '_controller' => 'PCloud\\PlatformBundle\\Controller\\AdvertController::viewsingleuserAction',));
                }

                // view_singlefile
                if (0 === strpos($pathinfo, '/viewsinglefile') && preg_match('#^/viewsinglefile/(?P<id>\\d+)$#s', $pathinfo, $matches)) {
                    return $this->mergeDefaults(array_replace($matches, array('_route' => 'view_singlefile')), array (  '_controller' => 'PCloud\\PlatformBundle\\Controller\\AdvertController::viewsinglefileAction',));
                }

                // view_singleusergroup
                if (0 === strpos($pathinfo, '/viewsingleusergroup') && preg_match('#^/viewsingleusergroup/(?P<id>\\d+)$#s', $pathinfo, $matches)) {
                    return $this->mergeDefaults(array_replace($matches, array('_route' => 'view_singleusergroup')), array (  '_controller' => 'PCloud\\PlatformBundle\\Controller\\AdvertController::viewsingleusergroupAction',));
                }

                // view_singlefilegroup
                if (0 === strpos($pathinfo, '/viewsinglefilegroup') && preg_match('#^/viewsinglefilegroup/(?P<id>\\d+)$#s', $pathinfo, $matches)) {
                    return $this->mergeDefaults(array_replace($matches, array('_route' => 'view_singlefilegroup')), array (  '_controller' => 'PCloud\\PlatformBundle\\Controller\\AdvertController::viewsinglefilegroupAction',));
                }

            }

            // view_usergroupAccess
            if (0 === strpos($pathinfo, '/viewusergroupAccess') && preg_match('#^/viewusergroupAccess/(?P<id>\\d+)$#s', $pathinfo, $matches)) {
                return $this->mergeDefaults(array_replace($matches, array('_route' => 'view_usergroupAccess')), array (  '_controller' => 'PCloud\\PlatformBundle\\Controller\\AdvertController::viewusergroupAccessAction',));
            }

        }

        if (0 === strpos($pathinfo, '/add')) {
            // add_user
            if (rtrim($pathinfo, '/') === '/adduser') {
                if (substr($pathinfo, -1) !== '/') {
                    return $this->redirect($pathinfo.'/', 'add_user');
                }

                return array (  '_controller' => 'PCloud\\PlatformBundle\\Controller\\AdvertController::adduserAction',  '_route' => 'add_user',);
            }

            // add_file
            if (rtrim($pathinfo, '/') === '/addfile') {
                if (substr($pathinfo, -1) !== '/') {
                    return $this->redirect($pathinfo.'/', 'add_file');
                }

                return array (  '_controller' => 'PCloud\\PlatformBundle\\Controller\\AdvertController::addfileAction',  '_route' => 'add_file',);
            }

            // add_usergroup
            if (rtrim($pathinfo, '/') === '/addusergroup') {
                if (substr($pathinfo, -1) !== '/') {
                    return $this->redirect($pathinfo.'/', 'add_usergroup');
                }

                return array (  '_controller' => 'PCloud\\PlatformBundle\\Controller\\AdvertController::addusergroupAction',  '_route' => 'add_usergroup',);
            }

            // add_filegroup
            if (rtrim($pathinfo, '/') === '/addfilegroup') {
                if (substr($pathinfo, -1) !== '/') {
                    return $this->redirect($pathinfo.'/', 'add_filegroup');
                }

                return array (  '_controller' => 'PCloud\\PlatformBundle\\Controller\\AdvertController::addfilegroupAction',  '_route' => 'add_filegroup',);
            }

            // add_access
            if (0 === strpos($pathinfo, '/addaccess') && preg_match('#^/addaccess/(?P<usersgroupsid>\\d+)/(?P<filesgroupsid>\\d+)/(?P<write>\\d+)$#s', $pathinfo, $matches)) {
                return $this->mergeDefaults(array_replace($matches, array('_route' => 'add_access')), array (  '_controller' => 'PCloud\\PlatformBundle\\Controller\\AdvertController::addaccessAction',));
            }

        }

        if (0 === strpos($pathinfo, '/delete')) {
            // delete_user
            if (0 === strpos($pathinfo, '/deleteuser') && preg_match('#^/deleteuser/(?P<id>\\d+)$#s', $pathinfo, $matches)) {
                return $this->mergeDefaults(array_replace($matches, array('_route' => 'delete_user')), array (  '_controller' => 'PCloud\\PlatformBundle\\Controller\\AdvertController::deleteuserAction',));
            }

            // delete_file
            if (0 === strpos($pathinfo, '/deletefile') && preg_match('#^/deletefile/(?P<id>\\d+)$#s', $pathinfo, $matches)) {
                return $this->mergeDefaults(array_replace($matches, array('_route' => 'delete_file')), array (  '_controller' => 'PCloud\\PlatformBundle\\Controller\\AdvertController::deletefileAction',));
            }

            // delete_usergroup
            if (0 === strpos($pathinfo, '/deleteusergroup') && preg_match('#^/deleteusergroup/(?P<id>\\d+)$#s', $pathinfo, $matches)) {
                return $this->mergeDefaults(array_replace($matches, array('_route' => 'delete_usergroup')), array (  '_controller' => 'PCloud\\PlatformBundle\\Controller\\AdvertController::deleteusergroupAction',));
            }

            // delete_filegroup
            if (0 === strpos($pathinfo, '/deletefilegroup') && preg_match('#^/deletefilegroup/(?P<id>\\d+)/(?P<title>[^/]++)$#s', $pathinfo, $matches)) {
                return $this->mergeDefaults(array_replace($matches, array('_route' => 'delete_filegroup')), array (  '_controller' => 'PCloud\\PlatformBundle\\Controller\\AdvertController::deletefilegroupAction',));
            }

        }

        if (0 === strpos($pathinfo, '/edit')) {
            // edit_user
            if (rtrim($pathinfo, '/') === '/edituser') {
                if (substr($pathinfo, -1) !== '/') {
                    return $this->redirect($pathinfo.'/', 'edit_user');
                }

                return array (  '_controller' => 'PCloud\\PlatformBundle\\Controller\\AdvertController::edituserAction',  '_route' => 'edit_user',);
            }

            // edit_file
            if (rtrim($pathinfo, '/') === '/editfile') {
                if (substr($pathinfo, -1) !== '/') {
                    return $this->redirect($pathinfo.'/', 'edit_file');
                }

                return array (  '_controller' => 'PCloud\\PlatformBundle\\Controller\\AdvertController::editfileAction',  '_route' => 'edit_file',);
            }

            // edit_usergroup
            if (rtrim($pathinfo, '/') === '/editusergroup') {
                if (substr($pathinfo, -1) !== '/') {
                    return $this->redirect($pathinfo.'/', 'edit_usergroup');
                }

                return array (  '_controller' => 'PCloud\\PlatformBundle\\Controller\\AdvertController::editusergroupAction',  '_route' => 'edit_usergroup',);
            }

            // edit_filegroup
            if (rtrim($pathinfo, '/') === '/editfilegroup') {
                if (substr($pathinfo, -1) !== '/') {
                    return $this->redirect($pathinfo.'/', 'edit_filegroup');
                }

                return array (  '_controller' => 'PCloud\\PlatformBundle\\Controller\\AdvertController::editfilegroupAction',  '_route' => 'edit_filegroup',);
            }

        }

        // addview_filegroup
        if (0 === strpos($pathinfo, '/addview') && preg_match('#^/addview/(?P<id>[^/]++)/(?P<title>[^/]++)$#s', $pathinfo, $matches)) {
            return $this->mergeDefaults(array_replace($matches, array('_route' => 'addview_filegroup')), array (  '_controller' => 'PCloud\\PlatformBundle\\Controller\\AdvertController::addviewAction',));
        }

        // deleteview_filegroup
        if (0 === strpos($pathinfo, '/deleteview') && preg_match('#^/deleteview/(?P<title>[^/]++)$#s', $pathinfo, $matches)) {
            return $this->mergeDefaults(array_replace($matches, array('_route' => 'deleteview_filegroup')), array (  '_controller' => 'PCloud\\PlatformBundle\\Controller\\AdvertController::deleteviewAction',));
        }

        // _welcome
        if (rtrim($pathinfo, '/') === '') {
            if (substr($pathinfo, -1) !== '/') {
                return $this->redirect($pathinfo.'/', '_welcome');
            }

            return array (  '_controller' => 'Acme\\DemoBundle\\Controller\\WelcomeController::indexAction',  '_route' => '_welcome',);
        }

        if (0 === strpos($pathinfo, '/demo')) {
            if (0 === strpos($pathinfo, '/demo/secured')) {
                if (0 === strpos($pathinfo, '/demo/secured/log')) {
                    if (0 === strpos($pathinfo, '/demo/secured/login')) {
                        // _demo_login
                        if ($pathinfo === '/demo/secured/login') {
                            return array (  '_controller' => 'Acme\\DemoBundle\\Controller\\SecuredController::loginAction',  '_route' => '_demo_login',);
                        }

                        // _demo_security_check
                        if ($pathinfo === '/demo/secured/login_check') {
                            return array (  '_controller' => 'Acme\\DemoBundle\\Controller\\SecuredController::securityCheckAction',  '_route' => '_demo_security_check',);
                        }

                    }

                    // _demo_logout
                    if ($pathinfo === '/demo/secured/logout') {
                        return array (  '_controller' => 'Acme\\DemoBundle\\Controller\\SecuredController::logoutAction',  '_route' => '_demo_logout',);
                    }

                }

                if (0 === strpos($pathinfo, '/demo/secured/hello')) {
                    // acme_demo_secured_hello
                    if ($pathinfo === '/demo/secured/hello') {
                        return array (  'name' => 'World',  '_controller' => 'Acme\\DemoBundle\\Controller\\SecuredController::helloAction',  '_route' => 'acme_demo_secured_hello',);
                    }

                    // _demo_secured_hello
                    if (preg_match('#^/demo/secured/hello/(?P<name>[^/]++)$#s', $pathinfo, $matches)) {
                        return $this->mergeDefaults(array_replace($matches, array('_route' => '_demo_secured_hello')), array (  '_controller' => 'Acme\\DemoBundle\\Controller\\SecuredController::helloAction',));
                    }

                    // _demo_secured_hello_admin
                    if (0 === strpos($pathinfo, '/demo/secured/hello/admin') && preg_match('#^/demo/secured/hello/admin/(?P<name>[^/]++)$#s', $pathinfo, $matches)) {
                        return $this->mergeDefaults(array_replace($matches, array('_route' => '_demo_secured_hello_admin')), array (  '_controller' => 'Acme\\DemoBundle\\Controller\\SecuredController::helloadminAction',));
                    }

                }

            }

            // _demo
            if (rtrim($pathinfo, '/') === '/demo') {
                if (substr($pathinfo, -1) !== '/') {
                    return $this->redirect($pathinfo.'/', '_demo');
                }

                return array (  '_controller' => 'Acme\\DemoBundle\\Controller\\DemoController::indexAction',  '_route' => '_demo',);
            }

            // _demo_hello
            if (0 === strpos($pathinfo, '/demo/hello') && preg_match('#^/demo/hello/(?P<name>[^/]++)$#s', $pathinfo, $matches)) {
                return $this->mergeDefaults(array_replace($matches, array('_route' => '_demo_hello')), array (  '_controller' => 'Acme\\DemoBundle\\Controller\\DemoController::helloAction',));
            }

            // _demo_contact
            if ($pathinfo === '/demo/contact') {
                return array (  '_controller' => 'Acme\\DemoBundle\\Controller\\DemoController::contactAction',  '_route' => '_demo_contact',);
            }

        }

        throw 0 < count($allow) ? new MethodNotAllowedException(array_unique($allow)) : new ResourceNotFoundException();
    }
}
