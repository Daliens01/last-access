"use client"
import React from 'react'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, user} from "@nextui-org/react";
import ExcelLic from "@/Components/ExcelLic";
// import { useSearchParams } from "next/navigation";
import { ApiHook } from '@/hooks/useApi';
import { Reload } from '@/hooks/useReload';

const Tables = ({id}) =>{
    try {
        //id de la ruta para especificar la ruta de la api
        // const router = useSearchParams();
        // const ids = router.get("id")
        //fetch para obtener los resultados de la api
        const {data, count} = ApiHook(id)
        //hook para parar las recargas
        Reload()
        const fecha = new Date()
        //busca la fecha actual para mostrarlo en pantalla
        const TodaysDate = `${fecha.getFullYear()}-${fecha.getMonth()+1 > 9?fecha.getMonth()+1:`0${fecha.getMonth()+1}`}-${fecha.getDate() > 9? fecha.getDate(): `0${fecha.getDate()}`}`;
          if(count){
           return( <h1 style={{textAlign:"center"}}>has excendido el limite de consultas</h1>)
          }else{
            return (<div>
              <h1 style={{textAlign:"center"}}>Alumnos de {id} sin acceder a la fecha de {TodaysDate}</h1>
              <Table isStriped 
              color={"success"}
              selectionMode="single" 
              aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>MATRICULA</TableColumn>
              <TableColumn>ALUMNO</TableColumn>
              <TableColumn>CURSOS</TableColumn>
              <TableColumn>ÚLTIMO ACCESO</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No hay alumnos sin acceder por mas de 9 días"}>
              {/* se consulta si la longitud de los datos son mayores a 0 para mandar el mensaje de arriba o si no, mandar los datos obtenidos */}
           {data.map(e=>e).length>0? data.map(e=>(
              <TableRow key={e.MATRICULA} style={{cursor:"pointer"}}>
              <TableCell>{e.MATRICULA}</TableCell>
              <TableCell>{e.ALUMNO}</TableCell>
              <TableCell>{e.CURSOS}</TableCell>
              <TableCell>{e.ACCESO}</TableCell>
              </TableRow>
            )):[]
           }
            </TableBody>
          </Table>
          <div>
            <ExcelLic data={data} name={id}/>
          </div>
          </div>)
          }
      } catch (error) {
        return(<p> pagina no encontrada. Error {error} </p>)
      }
}

export default Tables