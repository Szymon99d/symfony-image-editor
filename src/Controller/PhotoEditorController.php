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
        //check if the request is an ajax request
        if($request->isXmlHttpRequest())
        {
            $imgFile = $request->files->get('uploadImg'); //get selected image
            $imgSize = getimagesize($imgFile); //get image width and height
            $imgExt = $imgFile->getClientOriginalExtension(); //get image extension
            //check image extension
            if($imgExt=="png" || $imgExt=="jpg" || $imgExt=="jpeg")
            {
                if(!is_null($imgFile) && $imgSize[0]<=1000 && $imgSize[1]<=1000){
                
                    //set unique name and original extension
                    $fileName = uniqid().".".$imgFile->getClientOriginalExtension();
                    
                    //move the file to the directory where you want to store it 
                    $imgFile->move($this->getParameter("image_path"),$fileName);
                    
                    //send back image path 
                    $imgPath = "images/"."".$fileName;

                    return new JsonResponse($imgPath);
                }
                else{
                    return new JsonResponse(null,406);
                }  
            }
            else
            {
                return new JsonResponse(null,406);
            }
 
        }
        
        return $this->render('index.html.twig', [
            'controller_name' => 'PhotoEditorController',
        ]);
    }
}
