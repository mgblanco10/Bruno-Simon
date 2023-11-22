

<div className='w-[690px] h-[200px] border-none bg-gray-200 shadow-md rounded-md ml-4'>
{/* Nombre */}
<div className='col-span-2 col-start-5 row-start-1 flex flex-row justify-between'>
  <div>{t('MSG_45')} </div>
  <input
    className={detailsInput}
    onKeyDown={(e) => handleInput(e)}
    placeholder={newInfo.nombre}
    name='newUserName'
    type='text'
  />
</div>

     {/* apellido */}
<div className='col-span-2 col-start-7 row-start-1 flex flex-row justify-between'>
  <div>{t('MSG_46')} </div>
  <input
    className={detailsInput}
    onKeyDown={(e) => handleInput(e)}
    placeholder={newInfo.apellidos}
    name='newUserSurname'
    type='text'
  />
</div>
{/* direccion */}
<div className='col-span-2 col-start-5 row-start-2 flex flex-row justify-between'>
  <div>{t('MSG_84')} </div>
  <input
    className={detailsInput}
    onKeyDown={(e) => handleInput(e)}
    placeholder={newInfo.direccion}
    name='newUserAddress'
    type='text'
  />
</div>

{/* ciudad */}
<div className='col-span-2 col-start-7 row-start-2 flex flex-row justify-between'>
  <div>{t('MSG_64')} </div>
  <input
    className={detailsInput}
    onKeyDown={(e) => handleInput(e)}
    placeholder={newInfo.poblacion}
    name='newUserCity'
    type='text'
  />
</div>
{/* codigo postal */}
<div className='col-span-2 col-start-5 row-start-3 flex flex-row justify-between'>
  <div>{t('MSG_80')} </div>
  <input
    className={detailsInput}
    onKeyDown={(e) => handleInput(e)}
    placeholder={newInfo.codPostal}
    name='newUserPostCode'
    type='text'
  />
</div>

{/* pais */}
<div className='col-span-2 col-start-7 row-start-3 flex flex-row justify-between'>
  <div>{t('MSG_63')} </div>
  <input
    className={detailsInput}
    onKeyDown={(e) => handleInput(e)}
    placeholder={newInfo.pais}
    name='newUserCountry'
    type='text'
  />
</div>
{/* email */}
<div className='col-span-2 col-start-5 row-start-4 flex flex-row justify-between'>
  <div>{t('MSG_70')} </div>
  <input
    className={detailsInput}
    onKeyDown={(e) => handleInput(e)}
    placeholder={newInfo.email}
    name='newUserEmail'
    type='email'
  />
</div>
{/* telefono */}
<div className='col-span-2 col-start-7 row-start-4 flex flex-row justify-between'>
  <div>{t('MSG_49')}</div>
  <input
    className={detailsInput}
    onKeyDown={(e) => handleInput(e)}
    name='newUserPhone'
    type='phone'
    placeholder={newInfo.movil}
  />
</div>
</div>

