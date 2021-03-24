var template = `
<div>
  <div class=" mx-auto bg-white p-7 m-5">
    <div class="flex row justify-between">
      <div>
        {{{company_name}}} <br/>
        {{{your_name}}} <br/>
        {{{company_gstin}}} <br/>
        {{{address}}} <br/>
        {{{city}}} <br/>
      </div>
      <div>
        {{{company_logo}}}
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
</div>
`
export default template;