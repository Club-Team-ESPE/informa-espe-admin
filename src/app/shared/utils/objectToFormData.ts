interface AnyObj {
  [key: string]: any;
}

export function objToFormData(obj: AnyObj, form?:FormData, namespace?:string) : FormData{
  const fd = form || new FormData();

  for (let property in obj) {
    if (obj.hasOwnProperty(property)) {
      const formKey = namespace ? `${namespace}[${property}]` : property;

      // Si la propiedad es un objeto, llama recursivamente
      if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
        objToFormData(obj[property], fd, formKey);
      } else {
        // Si no, simplemente añade el valor
        fd.append(formKey, obj[property]);
      }
    }
  }
  return fd;
}