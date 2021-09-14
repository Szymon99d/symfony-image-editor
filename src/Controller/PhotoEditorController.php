<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PhotoEditorController extends AbstractController
{
    #[Route('/', name: 'app_homepage')]
    public function index(Request $request): Response
    {
        if($request->isXmlHttpRequest())
        {
            $imgFile = $request->files->get('uploadImg');
            $imgSize = getimagesize($imgFile);
            if(!is_null($imgFile) && $imgSize[0]<=1000 && $imgSize[1]<=1000){
                $fileName = uniqid().".".$imgFile->getClientOriginalExtension();
                $imgFile->move($this->getParameter("image_path"),$fileName);
                $imgPath = "images/"."".$fileName;
                $location = $imgPath;
                return new JsonResponse($location);
            }
            else{
                return new JsonResponse(null,500);
            }   
        }
        
        return $this->render('index.html.twig', [
            'controller_name' => 'PhotoEditorController',
        ]);
    }
}
