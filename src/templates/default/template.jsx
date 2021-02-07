var template = `
<div class=" mx-auto bg-white p-7 m-5 shadow-xl">
  <div class="flex row justify-between">
    <div>
      {{{company_name}}} <br/>
      {{{your_name}}} <br/>
      {{{company_gstin}}} <br/>
      {{{address}}} <br/>
      {{{city}}} <br/>
    </div>
    <div>
      <div>
      {{#unless previewMode}}    
        <button class='w-24 h-24 absolute border-solid border-2 border-black-500 border-opacity-20 rounded focus:outline-none' name='change-logo'>
          <svg class='w-6 inline object-top pointer-events-none ' viewBox='0 0 20 20'>
            <path fill-rule='evenodd' d='M9.958,5.956c-2.577,0-4.667,2.089-4.667,4.667c0,2.577,2.089,4.667,4.667,4.667s4.667-2.09,4.667-4.667C14.625,8.045,12.535,5.956,9.958,5.956z M9.958,14.123c-1.933,0-3.5-1.568-3.5-3.5c0-1.933,1.567-3.5,3.5-3.5s3.5,1.567,3.5,3.5C13.458,12.555,11.891,14.123,9.958,14.123z M18.124,3.623h-2.916l-0.583-1.167c0,0-0.522-1.167-1.167-1.167h-7c-0.645,0-1.167,1.167-1.167,1.167L4.708,3.623H1.792c-0.645,0-1.167,0.522-1.167,1.167v12.832c0,0.645,0.522,1.168,1.167,1.168h16.333c0.645,0,1.167-0.523,1.167-1.168V4.789C19.291,4.145,18.769,3.623,18.124,3.623z M18.124,17.039c0,0.322-0.261,0.582-0.583,0.582H2.375c-0.323,0-0.583-0.26-0.583-0.582V5.373c0-0.323,0.261-0.583,0.583-0.583h2.954C5.316,4.74,5.292,4.695,5.292,4.643l0.933-1.458c0,0,0.418-0.729,0.934-0.729h5.6c0.516,0,0.934,0.729,0.934,0.729l0.934,1.458c0,0.052-0.024,0.097-0.038,0.146h2.954c0.322,0,0.583,0.261,0.583,0.583V17.039z' clip-rule='evenodd' />
          </svg>
        </button>
        <input name='company_logo_input' class='hidden' type='file' id='fileUploadButton' accept='image/x-png,image/jpeg' />
      {{/unless}}
      </div>
    <img id='company_logo' name='company_logo' class='object-cover w-24 h-24 rounded' src='https://placehold.co/300x300/e2e8f0/e2e8f0' />
    </div>
  </div>
  <div class="flex row justify-between mt-10">
    <div class="w-2/4">
      {{{bill_to}}} <br/>
      {{{client_company}}} <br/>
      {{{client_name}}} <br/>
      {{{client_gstin}}} <br/>
      {{{client_address}}} <br/>
      {{{client_city}}} <br/>
    </div>
    <div class="w-2/4">
      <table class="w-full table-fixed" ><tr><td>{{{invoice_number_label}}}</td></div><td>{{{invoice_number}}}</td></tr><tr><td>{{{invoice_date_label}}}</td><td>{{{invoice_date}}}</td></tr><tr><td>{{{due_date_label}}}</td><td>{{{due_date}}}</td></tr></table>
    </div>
  </div>
  <div class="flex items-start py-2 -mx-1 mt-10 bg-gray-600 text-white">
    <div class="flex-1 px-2">
      Item Description
    </div>
    <div class="w-32 px-1 text-left">
      Quantity
    </div>
    <div class="w-20 px-1 text-left">
      Rate
    </div>
    <div class="w-20 px-2 text-left">
      Amount
    </div>
    <div class="w-1 px-2">
    </div>
  </div>
  {{#each repeater}} 
    <div class="flex items-start py-2 -mx-1">
      <div class="flex-1 px-2">
        {{{this.description}}}
      </div>
      <div class="w-32 px-1 text-left">
        {{{this.quantity}}}
      </div>
      <div class="w-20 px-1 text-left">
        {{{this.rate}}}
      </div>
      <div class="w-20 px-2 text-left">
        {{{this.amount}}}
      </div>
      <div class="w-1 px-2">
       {{#if @index}}
       {{#unless ../previewMode}}
        <button name="delete-item" data-index="{{@index}}">
          <svg class="w-4 h-4 inline text-red-500 pointer-events-none"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </button>
       {{/unless}}
       {{/if}}
      </div>
    </div>
  {{/each}}
  {{#unless previewMode}}
  <div>
  <button name="add-item" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Add Item 
    <svg class="w-4 h-4 inline object-top pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
    </svg>
  </button>
</div>
{{/unless}}
  <div class="mt-10">
  {{{notes_label}}}<br/>
  {{{notes}}}
</div>
  <div class="mt-5">
  {{{terms_label}}}<br/>
  {{{terms}}}
</div>
</div>
`
export default template;